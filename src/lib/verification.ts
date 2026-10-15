export type VerificationLevel =
  | "UNVERIFIED"
  | "IDENTITY_VERIFIED"
  | "EVIDENCE_SUBMITTED"
  | "EVIDENCE_VERIFIED"
  | "CONTRIBUTION_VERIFIED"
  | "ORGANIZATION_VERIFIED";

export const VERIFICATION_COPY: Record<
  VerificationLevel,
  { label: string; short: string; explanation: string; tone: "neutral" | "info" | "success" }
> = {
  UNVERIFIED: {
    label: "Unverified",
    short: "V0",
    tone: "neutral",
    explanation:
      "No verification evidence has been submitted for this record. Claims should be treated as self-reported.",
  },
  IDENTITY_VERIFIED: {
    label: "Identity Verified",
    short: "V1",
    tone: "info",
    explanation:
      "Basic identity verification has been completed for this person. This does not verify their projects.",
  },
  EVIDENCE_SUBMITTED: {
    label: "Evidence Submitted",
    short: "V2",
    tone: "info",
    explanation:
      "Supporting evidence has been provided and is awaiting review. Submission is not the same as verification.",
  },
  EVIDENCE_VERIFIED: {
    label: "Evidence Verified",
    short: "V3",
    tone: "success",
    explanation:
      "This project has supporting evidence reviewed by ProGo. Verification does not guarantee the quality of the project; it confirms the specific evidence listed.",
  },
  CONTRIBUTION_VERIFIED: {
    label: "Contribution Verified",
    short: "V4",
    tone: "success",
    explanation:
      "A contribution has supporting evidence or confirmation from a project collaborator. This confirms the listed contribution, not overall project quality.",
  },
  ORGANIZATION_VERIFIED: {
    label: "Organization Verified",
    short: "V5",
    tone: "success",
    explanation:
      "An organization, university, or company has verified this record. The verification applies to the relationship stated, not to every claim on the page.",
  },
};

export function projectVerificationLevel(input: {
  evidence: { verificationStatus: string }[];
  members: { contributionStatus: string }[];
  orgVerified?: boolean;
}): VerificationLevel {
  if (input.orgVerified) return "ORGANIZATION_VERIFIED";
  const contrib = input.members.some(
    (m) => m.contributionStatus === "VERIFIED" || m.contributionStatus === "TEAM_CONFIRMED",
  );
  if (contrib) return "CONTRIBUTION_VERIFIED";
  const evidenceVerified = input.evidence.some(
    (e) => e.verificationStatus === "VERIFIED" || e.verificationStatus === "OWNERSHIP_VERIFIED",
  );
  if (evidenceVerified) return "EVIDENCE_VERIFIED";
  if (input.evidence.length > 0) return "EVIDENCE_SUBMITTED";
  return "UNVERIFIED";
}
