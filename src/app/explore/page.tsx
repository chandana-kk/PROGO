import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { MobileNav } from "@/components/SiteNavClient";
import { Button } from "@/components/ui/Button";
import { ExploreFilters } from "@/components/ExploreFilters";

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-canvas pb-24 md:pb-12">
      <SiteHeader variant="app" />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-electric">Explore</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Explore people, projects and work</h1>
          </div>
          <Button href="/projects/create" className="w-full md:w-auto">Create project</Button>
        </div>
        <ExploreFilters />
      </main>
      <SiteFooter />
      <MobileNav />
    </div>
  );
}
