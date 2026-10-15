"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function admin() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/home");
  return session;
}

export async function reviewVerification(id: string, decision: "APPROVE" | "REJECT" | "MORE") {
  const session = await admin();
  const req = await prisma.verificationRequest.findUnique({ include: { project: true }, where: { id } });
  if (!req) return;
  if (decision === "APPROVE") {
    await prisma.verificationRequest.update({
      where: { id },
      data: { status: "APPROVED", reviewedAt: new Date(), reviewerId: session.id },
    });
    await prisma.projectEvidence.updateMany({
      where: { projectId: req.projectId, verificationStatus: "SUBMITTED" },
      data: { verificationStatus: "VERIFIED" },
    });
    await prisma.notification.create({
      data: {
        userId: req.project.ownerId,
        type: "VERIFICATION",
        content: `Evidence review completed for ${req.project.title}. Check the specific evidence statuses.`,
        href: `/projects/${req.project.slug}`,
      },
    });
  } else if (decision === "REJECT") {
    await prisma.verificationRequest.update({
      where: { id },
      data: { status: "REJECTED", reviewedAt: new Date(), reviewerId: session.id },
    });
  } else {
    await prisma.verificationRequest.update({
      where: { id },
      data: { status: "MORE_EVIDENCE", reviewedAt: new Date(), reviewerId: session.id },
    });
    await prisma.notification.create({
      data: {
        userId: req.project.ownerId,
        type: "VERIFICATION",
        content: `Verification requires additional evidence for ${req.project.title}.`,
        href: `/projects/${req.project.slug}/verification`,
      },
    });
  }
  await prisma.auditLog.create({
    data: { actorId: session.id, action: `VERIFY_${decision}`, target: req.projectId },
  });
  revalidatePath("/admin/verification");
}

export async function resolveReport(id: string, status: string) {
  const session = await admin();
  await prisma.report.update({ where: { id }, data: { status } });
  await prisma.auditLog.create({ data: { actorId: session.id, action: "REPORT_" + status, target: id } });
  revalidatePath("/admin/reports");
}

export async function suspendUser(userId: string) {
  const session = await admin();
  await prisma.user.update({ where: { id: userId }, data: { role: "SUSPENDED" } });
  await prisma.auditLog.create({ data: { actorId: session.id, action: "SUSPEND_USER", target: userId } });
  revalidatePath("/admin/users");
}
