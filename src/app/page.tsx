import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Button } from "@/components/ui/Button";
import { SkillBadge } from "@/components/ui/Misc";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { prisma } from "@/lib/prisma";
import { toCard } from "@/lib/project-map";
import { ProjectGrid } from "@/components/ProjectCard";
import { ArrowRight, CheckCircle2, FileCheck2, Hammer, Sparkles } from "lucide-react";

export default async function LandingPage() {
  const raw = await prisma.project.findMany({
    where: { visibility: "PUBLIC" },
    include: {
      owner: { include: { profile: true } },
      skills: { include: { skill: true } },
      evidence: true,
      members: true,
      company: true,
      university: true,
    },
    orderBy: { featured: "desc" },
    take: 6,
  });
  const projects = raw.map(toCard);

  return (
    <div className="flex min-h-full flex-col bg-white">
      <SiteHeader />
      <main>
        <section className="border-b border-line bg-[linear-gradient(180deg,#f7faff_0%,#ffffff_70%)]">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-electric">
                Professional work network
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-navy sm:text-[2.75rem] sm:leading-[1.15]">
                Your work. Your proof. Your professional identity.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
                ProGo is a professional network built around real projects, contributions, and verified work.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/signup">Create your profile</Button>
                <Button href="/explore" variant="secondary">
                  Explore projects
                </Button>
              </div>
              <p className="mt-6 text-sm text-muted">Build. Prove. Grow.</p>
            </div>
            <aside className="progo-card overflow-hidden" aria-label="Product preview">
              <div className="cover-wash h-28" style={{ ["--hue" as string]: 208 }} />
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold">AI Energy Optimizer</p>
                    <p className="mt-1 text-sm text-muted">Created by Aarav Sharma</p>
                  </div>
                  <VerificationBadge level="EVIDENCE_VERIFIED" />
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Household energy prediction and optimization with a documented model and live demo.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["Python", "Machine Learning", "FastAPI", "PostgreSQL"].map((s) => (
                    <SkillBadge key={s}>{s}</SkillBadge>
                  ))}
                </div>
                <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted">Evidence</dt>
                    <dd className="mt-1">GitHub · Live Demo · Documentation</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted">Contribution</dt>
                    <dd className="mt-1">Model + backend architecture</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted">Status</dt>
                    <dd className="mt-1">Completed</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted">Verification</dt>
                    <dd className="mt-1">Evidence Verified</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            Don&apos;t just tell people what you can do. Show them.
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Traditional professional profiles tell people what you claim. ProGo helps show what you built.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { icon: Hammer, title: "BUILD", body: "Create projects and document your work." },
              { icon: FileCheck2, title: "PROVE", body: "Attach evidence and contributions." },
              { icon: Sparkles, title: "GROW", body: "Build a professional reputation around real work." },
            ].map((c) => (
              <div key={c.title} className="progo-card p-6">
                <c.icon className="h-5 w-5 text-electric" />
                <h3 className="mt-4 text-sm font-semibold tracking-wide">{c.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="how" className="border-y border-line bg-canvas">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-2xl font-semibold">How ProGo works</h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-4">
              {[
                ["01", "Create your identity", "Build a professional profile."],
                ["02", "Add your work", "Show projects you actually worked on."],
                ["03", "Add proof", "Connect repositories, deployments, documentation, screenshots, videos, and other evidence."],
                ["04", "Build reputation", "Your verified work becomes part of your professional identity."],
              ].map(([n, t, b]) => (
                <li key={n} className="progo-card p-5">
                  <p className="text-xs font-semibold tracking-widest text-electric">{n}</p>
                  <h3 className="mt-2 font-semibold">{t}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{b}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Explore real work</h2>
              <p className="mt-2 text-sm text-muted">Show your work. Make your contribution visible.</p>
            </div>
            <Link href="/explore" className="hidden items-center gap-1 text-sm font-medium text-electric sm:inline-flex">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ProjectGrid projects={projects} />
        </section>

        <section className="border-t border-line bg-midnight text-white">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-3xl font-semibold tracking-tight">
              Your work deserves more than a line on a resume.
            </h2>
            <p className="mt-3 text-lg text-white/70">Build it. Prove it. Share it.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/signup">Join ProGo</Button>
              <Button href="/explore" variant="secondary">
                Explore projects
              </Button>
            </div>
            <p className="mt-8 inline-flex items-center gap-2 text-sm text-white/60">
              <CheckCircle2 className="h-4 w-4 text-[#7ddea8]" />
              Professional identity backed by evidence
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
