import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { MobileNav } from "@/components/SiteNavClient";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { demoActivities, demoProjects } from "@/lib/demo-data";

export default function HomePage() {
  const featured = demoProjects.slice(0, 3);

  return (
    <div className="min-h-screen bg-canvas pb-24 md:pb-12">
      <SiteHeader variant="app" />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-electric">Workspace</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Your professional workspace</h1>
          </div>
          <Button href="/projects/create">Create project</Button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <section className="space-y-4">
            {demoActivities.map((item, index) => (
              <article key={`${item.title}-${index}`} className="progo-card p-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-[#eef4ff] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-electric">
                    {item.label}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-base font-semibold">{item.title}</h2>
                      <span className="text-xs text-muted">{item.time}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="space-y-5">
            <div className="progo-card p-5">
              <h2 className="text-lg font-semibold">Quick focus</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li className="flex items-center justify-between gap-3 border-b border-line pb-3 last:border-b-0 last:pb-0">
                  <span>Profile completion</span>
                  <span className="font-semibold text-electric">78%</span>
                </li>
                <li className="flex items-center justify-between gap-3 border-b border-line pb-3 last:border-b-0 last:pb-0">
                  <span>Verified projects</span>
                  <span className="font-semibold text-electric">3</span>
                </li>
                <li className="flex items-center justify-between gap-3 border-b border-line pb-3 last:border-b-0 last:pb-0">
                  <span>Followers</span>
                  <span className="font-semibold text-electric">1.8k</span>
                </li>
              </ul>
            </div>

            <div className="progo-card p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Featured work</h2>
                <Link href="/explore" className="text-sm text-electric">View all</Link>
              </div>
              <div className="mt-4 space-y-4">
                {featured.map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`} className="flex items-center gap-3 rounded-xl border border-line p-3 hover:border-electric">
                    <div className="cover-wash h-12 w-12 rounded-lg" style={{ ["--hue" as string]: project.coverHue }} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{project.title}</p>
                      <p className="text-xs text-muted">{project.creator}</p>
                    </div>
                    <Avatar name={project.creator} size={28} />
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
