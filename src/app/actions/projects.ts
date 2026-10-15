"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { CATEGORIES, PROJECT_STATUSES, RESERVED_PROJECT_SLUGS, VISIBILITY } from "@/lib/constants";
import { isSafeUrl, slugify } from "@/lib/utils";

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

const projectSchema = z.object({
  title: z.string().trim().min(3).max(80),
  description: z.string().trim().min(20).max(400),
  details: z.string().trim().max(4000).optional(),
  problem: z.string().trim().max(2000).optional(),
  solution: z.string().trim().max(2000).optional(),
  category: z.enum(CATEGORIES),
  status: z.enum(PROJECT_STATUSES),
  visibility: z.enum(VISIBILITY),
  contribution: z.string().trim().min(12).max(800),
  role: z.string().trim().min(2).max(80),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  skills: z.array(z.string()).max(12),
  github: z.string().optional(),
  demo: z.string().optional(),
  docs: z.string().optional(),
  video: z.string().optional(),
});

export async function createProjectAction(_prev: unknown, formData: FormData) {
  const session = await requireSession();
  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    details: formData.get("details") || undefined,
    problem: formData.get("problem") || undefined,
    solution: formData.get("solution") || undefined,
    category: formData.get("category"),
    status: formData.get("status"),
    visibility: formData.get("visibility"),
    contribution: formData.get("contribution"),
    role: formData.get("role") || "Contributor",
    startDate: formData.get("startDate") || undefined,
    endDate: formData.get("endDate") || undefined,
    skills: formData.getAll("skills"),
    github: formData.get("github") || undefined,
    demo: formData.get("demo") || undefined,
    docs: formData.get("docs") || undefined,
    video: formData.get("video") || undefined,
  });
  if (!parsed.success) return { error: "Please complete the required fields with valid values." };

  let slug = slugify(parsed.data.title);
  if (RESERVED_PROJECT_SLUGS.includes(slug)) slug = `${slug}-project`;
  const clash = await prisma.project.findUnique({ where: { slug } });
  if (clash) slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;

  const skillRows = await prisma.skill.findMany({ where: { name: { in: parsed.data.skills } } });
  const evidence = [
    ["GITHUB", parsed.data.github, "GitHub Repository"],
    ["DEMO", parsed.data.demo, "Live Demo"],
    ["DOCS", parsed.data.docs, "Documentation"],
    ["VIDEO", parsed.data.video, "Demo Video"],
  ].filter(([, url]) => url) as [string, string, string][];

  for (const [, url] of evidence) {
    if (!isSafeUrl(url)) return { error: "Evidence links must be valid http(s) URLs." };
  }

  const publish = formData.get("intent") === "publish";
  const project = await prisma.project.create({
    data: {
      ownerId: session.id,
      title: parsed.data.title,
      slug,
      description: parsed.data.details || parsed.data.description,
      problem: parsed.data.problem,
      solution: parsed.data.solution,
      category: parsed.data.category,
      status: parsed.data.status,
      visibility: parsed.data.visibility,
      startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : null,
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
      coverHue: 200 + Math.floor(Math.random() * 40),
      skills: { create: skillRows.map((s: { id: string }) => ({ skillId: s.id })) },
      members: {
        create: {
          userId: session.id,
          role: parsed.data.role,
          contributionDescription: parsed.data.contribution,
          contributionStatus: "PENDING",
        },
      },
      evidence: {
        create: evidence.map(([type, url, title]) => ({
          type,
          url,
          title,
          verificationStatus: "SUBMITTED",
        })),
      },
    },
  });

  if (publish && parsed.data.visibility === "PUBLIC") {
    await prisma.activity.create({
      data: {
        actorId: session.id,
        type: "PROJECT_PUBLISHED",
        content: `${session.fullName} published a new project.`,
        projectId: project.id,
      },
    });
  }

  revalidatePath("/projects");
  redirect(`/projects/${project.slug}`);
}

export async function updateProjectAction(projectId: string, formData: FormData) {
  const session = await requireSession();
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project || project.ownerId !== session.id) return { error: "You can only edit your own projects." };
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (title.length < 3 || description.length < 20) return { error: "Title and description are required." };
  await prisma.project.update({
    where: { id: projectId },
    data: {
      title,
      description,
      problem: String(formData.get("problem") ?? "") || null,
      solution: String(formData.get("solution") ?? "") || null,
      status: String(formData.get("status") ?? project.status),
      visibility: String(formData.get("visibility") ?? project.visibility),
      category: String(formData.get("category") ?? project.category),
    },
  });
  revalidatePath(`/projects/${project.slug}`);
  redirect(`/projects/${project.slug}`);
}

export async function addEvidenceAction(projectId: string, formData: FormData) {
  const session = await requireSession();
  const project = await prisma.project.findUnique({ where: { id: projectId }, include: { members: true } });
  if (!project) return { error: "Project not found." };
  const allowed = project.ownerId === session.id || project.members.some((m: { userId: string }) => m.userId === session.id);
  if (!allowed) return { error: "Only project members can add evidence." };
  const type = String(formData.get("type") ?? "OTHER");
  const title = String(formData.get("title") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  if (!title) return { error: "Evidence title is required." };
  if (url && !isSafeUrl(url)) return { error: "URL must be http(s)." };
  await prisma.projectEvidence.create({
    data: { projectId, type, title, url: url || null, description: String(formData.get("description") ?? "") || null, verificationStatus: "SUBMITTED" },
  });
  await prisma.verificationEvent.create({
    data: { projectId, eventType: "EVIDENCE_ADDED", status: "SUBMITTED", reviewerId: session.id },
  });
  revalidatePath(`/projects/${project.slug}`);
  return { ok: true, message: "Evidence submitted for verification." };
}

export async function submitVerificationAction(projectId: string, formData: FormData) {
  const session = await requireSession();
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project || project.ownerId !== session.id) return { error: "Only the owner can submit verification." };
  await prisma.verificationRequest.create({
    data: {
      projectId,
      requestedLevel: String(formData.get("level") ?? "EVIDENCE_VERIFIED"),
      status: "PENDING",
      claims: String(formData.get("contribution") ?? ""),
    },
  });
  await prisma.notification.create({
    data: {
      userId: session.id,
      type: "VERIFICATION",
      content: "Verification request submitted. Review is manual and evidence-specific.",
      href: `/projects/${project.slug}`,
    },
  });
  revalidatePath(`/projects/${project.slug}/verification`);
  return { ok: true, message: "Evidence submitted for verification." };
}

export async function followProjectAction(projectId: string) {
  const session = await requireSession();
  const existing = await prisma.projectFollow.findUnique({
    where: { userId_projectId: { userId: session.id, projectId } },
  });
  if (existing) {
    await prisma.projectFollow.delete({ where: { userId_projectId: { userId: session.id, projectId } } });
  } else {
    await prisma.projectFollow.create({ data: { userId: session.id, projectId } });
  }
  revalidatePath("/projects");
}

export async function confirmContributionAction(memberId: string) {
  const session = await requireSession();
  const member = await prisma.projectMember.findUnique({ include: { project: true }, where: { id: memberId } });
  if (!member) return { error: "Not found." };
  if (member.project.ownerId !== session.id) return { error: "Only the owner can confirm teammates." };
  await prisma.projectMember.update({
    where: { id: memberId },
    data: { contributionStatus: "TEAM_CONFIRMED" },
  });
  await prisma.notification.create({
    data: {
      userId: member.userId,
      type: "TEAM",
      content: "A teammate confirmed your contribution.",
      href: `/projects/${member.project.slug}`,
    },
  });
  revalidatePath(`/projects/${member.project.slug}`);
}

export async function inviteCollaboratorAction(projectId: string, formData: FormData) {
  const session = await requireSession();
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project || project.ownerId !== session.id) return { error: "Not allowed." };
  const username = String(formData.get("username") ?? "").toLowerCase().trim();
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return { error: "No user with that username." };
  await prisma.projectMember.upsert({
    where: { projectId_userId: { projectId, userId: user.id } },
    update: {},
    create: {
      projectId,
      userId: user.id,
      role: String(formData.get("role") ?? "Collaborator"),
      contributionDescription: String(formData.get("contribution") ?? "Invited collaborator"),
      contributionStatus: "PENDING",
      invited: true,
    },
  });
  await prisma.notification.create({
    data: {
      userId: user.id,
      type: "INVITE",
      content: `${session.fullName} invited you to ${project.title}.`,
      href: `/projects/${project.slug}`,
    },
  });
  revalidatePath(`/projects/${project.slug}`);
  return { ok: true, message: "Contribution confirmation requested." };
}
