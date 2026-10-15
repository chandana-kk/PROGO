import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { MobileNav } from "@/components/SiteNavClient";
import { Button } from "@/components/ui/Button";
import { SkillBadge } from "@/components/ui/Misc";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { demoProjects, getProject } from "@/lib/demo-data";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const creator = project.creator;

  return (
    <div className="min-h-screen bg-canvas pb-24 md:pb-12">
      <SiteHeader variant="app" />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="progo-card overflow-hidden">
          <div className="cover-wash h-44" style={{ ["--hue" as string]: project.coverHue }} />
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-electric">{project.category}</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">{project.title}</h1>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <VerificationBadge level={project.verification} />
                <span className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-muted">
                  {project.status}
                </span>
              </div>
            </div>

            <p className="mt-4 max-w-3xl text-lg text-muted">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <SkillBadge key={skill}>{skill}</SkillBadge>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-semibold">About</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{project.description}</p>
                </section>
                <section>
                  <h2 className="text-xl font-semibold">Problem</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{project.problem}</p>
                </section>
                <section>
                  <h2 className="text-xl font-semibold">Solution</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{project.solution}</p>
                </section>
                <section>
                  <h2 className="text-xl font-semibold">Technology</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span key={technology} className="rounded-full border border-line bg-[#f8fbff] px-3 py-1.5 text-xs font-medium text-navy">
                        {technology}
                      </span>
                    ))}
                  </div>
                </section>
                <section>
                  <h2 className="text-xl font-semibold">Contributors</h2>
                  <div className="mt-4 space-y-4">
                    {project.contributors.map((contributor) => (
                      <div key={`${project.slug}-${contributor.name}`} className="rounded-2xl border border-line bg-[#f8fbff] p-4">
                        <p className="font-semibold">{contributor.name}</p>
                        <p className="text-sm text-muted">{contributor.role}</p>
                        <p className="mt-2 text-sm leading-6 text-muted">Contribution: {contributor.contribution}</p>
                      </div>
                    ))}
                  </div>
                </section>
                <section>
                  <h2 className="text-xl font-semibold">Evidence</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.evidence.map((item) => (
                      <span key={item} className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-muted">
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              <aside className="space-y-5">
                <div className="progo-card p-5">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-electric">Creator</p>
                  <Link href={`/profile/${project.creatorUsername}`} className="mt-3 block font-semibold text-lg">{creator}</Link>
                  <p className="mt-1 text-sm text-muted">Project owner</p>
                  <p className="mt-5 text-sm text-muted">Status: <span className="font-medium text-navy">{project.status}</span></p>
                  <p className="mt-2 text-sm text-muted">Skills: {project.skills.join(" · ")}</p>
                  <div className="mt-5 flex gap-2">
                    <Button href={`/profile/${project.creatorUsername}`} variant="secondary">View creator</Button>
                  </div>
                </div>

                <div className="progo-card p-5">
                  <h3 className="text-lg font-semibold">Verification</h3>
                  <div className="mt-4">
                    <VerificationBadge level={project.verification} className="mb-3" />
                    <p className="text-sm leading-6 text-muted">
                      {project.verification === "EVIDENCE_VERIFIED" && "Specific supporting evidence for this project has been verified. This does not guarantee project quality."}
                      {project.verification === "CONTRIBUTION_VERIFIED" && "This contribution has supporting evidence or team confirmation. This confirms the listed contribution, not overall project quality."}
                      {project.verification === "ORGANIZATION_VERIFIED" && "This project has been verified by a recognized organization or institution for the relationship stated."}
                      {project.verification === "EVIDENCE_SUBMITTED" && "Supporting evidence has been submitted and is pending review."}
                      {project.verification === "UNVERIFIED" && "No evidence has been submitted for this project yet."}
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
      <MobileNav />
    </div>
  );
}
