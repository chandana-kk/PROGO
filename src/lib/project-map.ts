import { projectVerificationLevel } from "@/lib/verification";
import type { ProjectCardModel } from "@/components/ProjectCard";
import { EVIDENCE_TYPES } from "@/lib/constants";

export function toCard(p: {
  slug: string;
  title: string;
  description: string;
  status: string;
  coverHue: number;
  owner: { profile: { fullName: string; role: string | null } | null };
  skills: { skill: { name: string } }[];
  evidence: { type: string; verificationStatus: string }[];
  members: { contributionStatus: string }[];
  company?: { verified: boolean } | null;
  university?: { verified: boolean } | null;
}): ProjectCardModel {
  const labels = p.evidence
    .map((e) => EVIDENCE_TYPES.find((t) => t.id === e.type)?.label.split(" ")[0])
    .filter(Boolean) as string[];
  return {
    slug: p.slug,
    title: p.title,
    description: p.description,
    status: p.status,
    coverHue: p.coverHue,
    ownerName: p.owner.profile?.fullName ?? "Unknown",
    ownerRole: p.owner.profile?.role,
    skills: p.skills.map((s) => s.skill.name),
    evidenceCount: p.evidence.length,
    teamSize: p.members.length,
    evidenceLabels: labels.slice(0, 4),
    verification: projectVerificationLevel({
      evidence: p.evidence,
      members: p.members,
      orgVerified: Boolean(p.company?.verified || p.university?.verified),
    }),
  };
}

export const projectInclude = {
  owner: { include: { profile: true } },
  skills: { include: { skill: true } },
  evidence: true,
  members: { include: { user: { include: { profile: true } } } },
  company: true,
  university: true,
} as const;
