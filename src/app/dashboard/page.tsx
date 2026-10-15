import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { MobileNav } from "@/components/SiteNavClient";
import { Button } from "@/components/ui/Button";
import { demoProjects } from "@/lib/demo-data";

const stats = [
  { label: "Projects", value: "12" },
  { label: "Verified projects", value: "4" },
  { label: "Contributions", value: "18" },
  { label: "Followers", value: "1.8k" },
  { label: "Profile views", value: "8.4k" },
];

const checklist = ["Name", "Headline", "About", "Education", "Skills"];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-canvas pb-24 md:pb-12">
      <SiteHeader variant="app" />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-electric">Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Your ProGo dashboard</h1>
          </div>
          <Button href="/profile/aarav-sharma">View profile</Button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="progo-card p-4">
              <p className="text-sm text-muted">{stat.label}</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="progo-card p-6">
            <h2 className="text-xl font-semibold">Complete your profile</h2>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              {checklist.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-xl border border-line bg-[#f8fbff] p-3">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#dcfce7] text-[10px] font-bold text-[#0f8a5f]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
              <li className="flex items-center gap-3 rounded-xl border border-dashed border-line p-3">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f4f7fb] text-[10px] font-bold text-muted">○</span>
                <span>First project</span>
              </li>
              <li className="flex items-center gap-3 rounded-xl border border-dashed border-line p-3">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f4f7fb] text-[10px] font-bold text-muted">○</span>
                <span>Add evidence</span>
              </li>
              <li className="flex items-center gap-3 rounded-xl border border-dashed border-line p-3">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f4f7fb] text-[10px] font-bold text-muted">○</span>
                <span>Verify your work</span>
              </li>
            </ul>
            <div className="mt-6">
              <Button href="/profile/aarav-sharma" className="w-full md:w-auto">Complete profile</Button>
            </div>
          </section>

          <aside className="space-y-5">
            <div className="progo-card p-5">
              <h2 className="text-lg font-semibold">Recent projects</h2>
              <div className="mt-4 space-y-3">
                {demoProjects.slice(0, 3).map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`} className="flex items-start justify-between gap-3 rounded-xl border border-line p-3 hover:border-electric">
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-xs text-muted">{project.category}</p>
                    </div>
                    <span className="rounded-full bg-[#eef4ff] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-electric">{project.status}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
      <MobileNav />
    </div>
  );
}
