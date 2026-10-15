"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProjectGrid } from "@/components/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SkillBadge } from "@/components/ui/Misc";
import { Avatar } from "@/components/ui/Avatar";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { CATEGORIES } from "@/lib/constants";
import { demoProjects, demoUsers, skillCatalog } from "@/lib/demo-data";

const tabs = ["Projects", "People", "Skills"] as const;
const verificationOptions = [
  "Any",
  "EVIDENCE_SUBMITTED",
  "EVIDENCE_VERIFIED",
  "CONTRIBUTION_VERIFIED",
  "ORGANIZATION_VERIFIED",
] as const;

const projectCards = demoProjects.map((project) => ({
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

export function ExploreFilters() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Projects");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [verification, setVerification] = useState<(typeof verificationOptions)[number]>("Any");

  const visibleProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projectCards.filter((project) => {
      const matchesQuery =
        !normalized ||
        [project.title, project.description, project.ownerName, ...project.skills]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      const matchesCategory =
        category === "All" ||
        project.skills.some((skill) => skill.toLowerCase().includes(category.toLowerCase().split(" ")[0] ?? ""));
      const matchesStatus = status === "All" || project.status === status;
      const matchesVerification = verification === "Any" || project.verification === verification;
      return matchesQuery && matchesCategory && matchesStatus && matchesVerification;
    });
  }, [category, query, status, verification]);

  const visiblePeople = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return demoUsers.filter((person) => {
      const haystack = [person.name, person.role, person.headline, person.skills.join(" ")].join(" ").toLowerCase();
      return !normalized || haystack.includes(normalized);
    });
  }, [query]);

  const visibleSkills = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return skillCatalog.filter((skill) => !normalized || skill.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <>
      <div className="mt-6 progo-card p-3 md:p-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects, people, skills..."
              className="border-transparent bg-[#f5f7fb] px-4 py-3"
            />
          </div>
          <Button variant="secondary" className="shrink-0">Filter</Button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setTab(option)}
            className={[
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              tab === option ? "border-electric bg-electric text-white" : "border-line bg-white text-muted hover:text-navy",
            ].join(" ")}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="progo-card p-4">
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Category</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {["All", ...CATEGORIES].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={[
                      "rounded-full border px-2.5 py-1.5 text-xs",
                      category === item ? "border-electric bg-electric/10 text-electric" : "border-line bg-white text-muted",
                    ].join(" ")}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Status</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {["All", "IDEA", "BUILDING", "BETA", "ACTIVE", "COMPLETED"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setStatus(item)}
                    className={[
                      "rounded-full border px-2.5 py-1.5 text-xs",
                      status === item ? "border-electric bg-electric/10 text-electric" : "border-line bg-white text-muted",
                    ].join(" ")}
                  >
                    {item === "All" ? item : item.replace(/_/g, " ")}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Verification</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {verificationOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setVerification(item)}
                    className={[
                      "rounded-full border px-2.5 py-1.5 text-xs",
                      verification === item ? "border-electric bg-electric/10 text-electric" : "border-line bg-white text-muted",
                    ].join(" ")}
                  >
                    {item === "Any" ? "Any" : item.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <section>
          {tab === "Projects" ? (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Projects</h2>
                <span className="text-sm text-muted">{visibleProjects.length} results</span>
              </div>
              {visibleProjects.length ? (
                <ProjectGrid projects={visibleProjects} />
              ) : (
                <p className="text-sm text-muted">No projects matched this search.</p>
              )}
            </div>
          ) : null}

          {tab === "People" ? (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">People</h2>
                <span className="text-sm text-muted">{visiblePeople.length} profiles</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visiblePeople.map((person) => (
                  <Link key={person.username} href={`/profile/${person.username}`} className="progo-card block p-4 transition hover:-translate-y-0.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={person.name} size={44} />
                      <div>
                        <p className="font-semibold">{person.name}</p>
                        <p className="text-xs text-muted">{person.role}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-muted">{person.headline}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {person.skills.slice(0, 3).map((skill) => (
                        <SkillBadge key={skill}>{skill}</SkillBadge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted">
                      <span>{person.followers.toLocaleString()} followers</span>
                      <VerificationBadge level="EVIDENCE_VERIFIED" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {tab === "Skills" ? (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Skills</h2>
                <span className="text-sm text-muted">{visibleSkills.length} matches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {visibleSkills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    className="rounded-full border border-line bg-white px-3 py-2 text-sm text-muted hover:border-electric hover:text-electric"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </>
  );
}
