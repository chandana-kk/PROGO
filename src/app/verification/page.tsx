import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { VerificationBadge } from "@/components/ui/VerificationBadge";

export default function VerificationPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader variant="marketing" />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="progo-card p-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-electric">Verification</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Transparent proof, not vanity metrics.</h1>
          <div className="mt-6 flex flex-wrap gap-3">
            <VerificationBadge level="EVIDENCE_SUBMITTED" />
            <VerificationBadge level="EVIDENCE_VERIFIED" />
            <VerificationBadge level="CONTRIBUTION_VERIFIED" />
            <VerificationBadge level="ORGANIZATION_VERIFIED" />
          </div>
          <p className="mt-6 text-sm leading-7 text-muted">Verification labels clarify whether work has been supported by evidence or confirmed by collaborators. ProGo does not claim authenticity percentages or inflated trust scores.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
