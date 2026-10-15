import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Button } from "@/components/ui/Button";

export default function CompaniesPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader variant="marketing" />
      <main className="mx-auto max-w-5xl px-4 py-16">
        <div className="progo-card p-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-electric">For companies</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Discover evidence-backed talent</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted">ProGo helps teams evaluate real project work, contribution history, and verified proof instead of just resumes.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button href="/signup">Request access</Button>
            <Button href="/explore" variant="secondary">Explore work</Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
