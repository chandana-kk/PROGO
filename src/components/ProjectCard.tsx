import { STATUS_LABEL } from "@/lib/constants";
import { projectVerificationLevel } from "@/lib/verification";
import { truncate } from "@/lib/utils";
import { Users } from "lucide-react";
import Link from "next/link";
import { Avatar } from "./ui/Avatar";
import { SkillBadge } from "./ui/Misc";
import { VerificationBadge } from "./ui/VerificationBadge";

export type ProjectCardModel = {
  slug: string;
  title: string;
  description: string;
  status: string;
  coverHue: number;
  ownerName: string;
  ownerRole?: string | null;
  skills: string[];
  evidenceCount: number;
  teamSize: number;
  evidenceLabels?: string[];
  verification: ReturnType<typeof projectVerificationLevel>;
};

export function ProjectCard({ project }: { project: ProjectCardModel }) {
  return (
    <article className="progo-card flex h-full flex-col overflow-hidden">
      <div className="cover-wash h-28" style={{ ["--hue" as string]: project.coverHue }} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug">
            <Link href={`/projects/${project.slug}`} className="hover:text-electric">
              {project.title}
            </Link>
          </h3>
          <span className="shrink-0 rounded-full bg-[#f4f7fb] px-2 py-0.5 text-[11px] font-medium text-muted">
            {STATUS_LABEL[project.status] ?? project.status}
          </span>
        </div>
        <p className="mt-2 text-sm leading-6 text-muted">{truncate(project.description, 110)}</p>
        <div className="mt-4 flex items-center gap-2">
          <Avatar name={project.ownerName} size={28} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{project.ownerName}</p>
            {project.ownerRole ? <p className="truncate text-xs text-muted">{project.ownerRole}</p> : null}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.skills.slice(0, 4).map((s) => (
            <SkillBadge key={s}>{s}</SkillBadge>
          ))}
        </div>
        {project.evidenceLabels?.length ? (
          <p className="mt-3 text-xs text-muted">{project.evidenceLabels.join(" · ")}</p>
        ) : null}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <VerificationBadge level={project.verification} />
          <span className="text-xs text-muted">{project.evidenceCount} evidence</span>
          <span className="inline-flex items-center gap-1 text-xs text-muted">
            <Users className="h-3.5 w-3.5" /> {project.teamSize}
          </span>
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-5 text-sm font-medium text-electric hover:underline"
        >
          View project
        </Link>
      </div>
    </article>
  );
}

export function ProjectGrid({ projects }: { projects: ProjectCardModel[] }) {
  if (!projects.length) {
    return (
      <p className="text-sm text-muted">We couldn&apos;t find anything matching that search.</p>
    );
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  );
}
