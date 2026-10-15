import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export default function UniversitiesPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader variant="marketing" />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="progo-card p-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-electric">Universities</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Academic work with professional proof.</h1>
          <p className="mt-4 text-muted leading-7">Students and researchers can connect educational record, projects, and validated evidence to create a stronger professional story.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
