import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader variant="marketing" />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="progo-card p-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-electric">About ProGo</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Professional identity built around real work.</h1>
          <p className="mt-4 text-muted leading-7">ProGo is a professional network focused on projects, contributions, and evidence. It is designed to help people show what they built and be recognized for the work they actually do.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
