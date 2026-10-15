import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader variant="marketing" />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="progo-card p-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-electric">Jobs</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Work that can be verified.</h1>
          <p className="mt-4 text-muted leading-7">Teams can search for people with real project outcomes, evidence, and contribution signals instead of only static profiles.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
