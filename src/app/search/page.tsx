import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { MobileNav } from "@/components/SiteNavClient";
import { Input } from "@/components/ui/Input";
import { demoProjects, demoUsers } from "@/lib/demo-data";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-canvas pb-24 md:pb-12">
      <SiteHeader variant="app" />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-electric">Search</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Search ProGo</h1>
        </div>
        <div className="progo-card p-4">
          <Input placeholder="Search projects, people, skills..." className="bg-[#f8fbff]" />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="progo-card p-5">
            <h2 className="text-lg font-semibold">Popular projects</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {demoProjects.slice(0, 4).map((project) => (
                <li key={project.slug}>{project.title}</li>
              ))}
            </ul>
          </div>
          <div className="progo-card p-5">
            <h2 className="text-lg font-semibold">People</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {demoUsers.slice(0, 4).map((user) => (
                <li key={user.username}>{user.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <SiteFooter />
      <MobileNav />
    </div>
  );
}
