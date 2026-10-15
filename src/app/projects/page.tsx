import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { MobileNav } from "@/components/SiteNavClient";
import { ProjectGrid } from "@/components/ProjectCard";
import { Button } from "@/components/ui/Button";
import { demoProjects } from "@/lib/demo-data";

const cards = demoProjects.map((project) => ({
  slug: project.slug,
  title: project.title,
  description: project.description,
  status: project.status,
  coverHue: project.coverHue,
  ownerName: project.creator,
  ownerRole: project.contributors[0]?.role ?? "Contributor",
  skills: project.skills,
  evidenceCount: project.evidence.length,
  teamSize: project.contributors.length,
  evidenceLabels: project.evidence,
  verification: project.verification,
}));

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-canvas pb-24 md:pb-12">
      <SiteHeader variant="app" />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-electric">Projects</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Explore real work</h1>
          </div>
          <Button href="/projects/create">Create project</Button>
        </div>
        <div className="mt-8">
          <ProjectGrid projects={cards} />
        </div>
      </main>
      <SiteFooter />
      <MobileNav />
    </div>
  );
}
