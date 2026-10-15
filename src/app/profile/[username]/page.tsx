import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { MobileNav } from "@/components/SiteNavClient";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { SkillBadge } from "@/components/ui/Misc";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { demoProjects, getPerson } from "@/lib/demo-data";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const person = getPerson(username);

  if (!person) {
    notFound();
  }

  const userProjects = demoProjects.filter((project) => project.creatorUsername === person.username || project.contributors.some((member) => member.name === person.name));

  return (
    <div className="min-h-screen bg-canvas pb-24 md:pb-12">
      <SiteHeader variant="app" />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="progo-card overflow-hidden">
          <div className="cover-wash h-36" style={{ ["--hue" as string]: 208 }} />
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="flex items-end gap-4">
                <Avatar name={person.name} size={72} className="border-4 border-white" />
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight">{person.name}</h1>
                  <p className="mt-1 text-lg text-muted">{person.headline}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary">Follow</Button>
                <Button variant="secondary">Connect</Button>
                <Button>Share profile</Button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-line bg-[#f8fbff] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted">Followers</p>
                <p className="mt-2 text-2xl font-semibold">{person.followers.toLocaleString()}</p>
              </div>
              <div className="rounded-2xl border border-line bg-[#f8fbff] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted">Following</p>
                <p className="mt-2 text-2xl font-semibold">{person.following}</p>
              </div>
              <div className="rounded-2xl border border-line bg-[#f8fbff] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted">Profile views</p>
                <p className="mt-2 text-2xl font-semibold">{person.profileViews.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-6">
            <div className="progo-card p-6">
              <h2 className="text-xl font-semibold">About</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{person.about}</p>
            </div>

            <div className="progo-card p-6">
              <h2 className="text-xl font-semibold">Projects</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {userProjects.map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`} className="rounded-2xl border border-line bg-[#f8fbff] p-4 hover:border-electric">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold">{project.title}</p>
                      <VerificationBadge level={project.verification} />
                    </div>
                    <p className="mt-3 text-sm text-muted">{project.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="progo-card p-6">
              <h2 className="text-xl font-semibold">Experience</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {person.experience.map((item) => (
                  <li key={item} className="rounded-xl border border-line bg-white p-3">{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="progo-card p-6">
              <h2 className="text-xl font-semibold">Education</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {person.education.map((item) => (
                  <li key={item} className="rounded-xl border border-line bg-[#f8fbff] p-3">{item}</li>
                ))}
              </ul>
            </div>

            <div className="progo-card p-6">
              <h2 className="text-xl font-semibold">Skills</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {person.skills.map((skill) => (
                  <SkillBadge key={skill}>{skill}</SkillBadge>
                ))}
              </div>
            </div>

            <div className="progo-card p-6">
              <h2 className="text-xl font-semibold">Contributions</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {person.projects.map((projectSlug) => {
                  const project = demoProjects.find((entry) => entry.slug === projectSlug);
                  if (!project) return null;
                  return (
                    <li key={project.slug} className="rounded-xl border border-line bg-white p-3">
                      <Link href={`/projects/${project.slug}`} className="font-medium text-navy hover:text-electric">{project.title}</Link>
                      <p className="mt-1">{project.contributorSummary}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
      <MobileNav />
    </div>
  );
}
