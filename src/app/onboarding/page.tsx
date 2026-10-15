import Link from "next/link";
import { SiteHeader } from "@/components/SiteChrome";
import { Button } from "@/components/ui/Button";
import { SkillBadge } from "@/components/ui/Misc";

const roles = ["Student", "Developer", "Designer", "Researcher", "Data Professional", "Entrepreneur", "Freelancer", "Other"];
const skills = ["Python", "Machine Learning", "UI/UX", "Research", "SQL", "React", "Product Strategy", "Data Analysis"];

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader variant="app" />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="progo-card p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-electric">
            <span>Step 1 of 3</span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">What do you do?</h1>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {roles.map((role) => (
              <button key={role} type="button" className="rounded-2xl border border-line bg-[#f8fbff] p-4 text-left text-sm font-medium text-navy hover:border-electric hover:bg-white">
                {role}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">What are your skills?</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button key={skill} type="button" className="rounded-full border border-line bg-white px-3 py-2 text-sm text-muted hover:border-electric hover:text-electric">
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-[#f8fbff] p-5">
            <h2 className="text-xl font-semibold">Have you built a project?</h2>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button href="/projects/create">Add project</Button>
              <Button href="/home" variant="secondary">I&apos;ll do this later</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
