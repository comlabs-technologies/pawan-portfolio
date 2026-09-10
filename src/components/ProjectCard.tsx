import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { TechIconStack } from "./TechIconStack";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  /** Above-the-fold cards skip lazy loading. */
  priority?: boolean;
  className?: string;
};

const shell = cn(
  "group relative flex h-full flex-col rounded-xl p-2 -m-2 ring-1 ring-transparent",
  "transition-[background-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
);

const interactive = cn(
  "hover:bg-muted/60 hover:ring-[var(--image-ring)] hover:shadow-[var(--shadow-lift)]",
  "focus-visible:bg-muted/60 focus-visible:ring-[var(--image-ring)]",
  "focus-visible:shadow-[var(--shadow-lift)]",
);

export function ProjectCard({ project, priority = false, className }: ProjectCardProps) {
  const body = <ProjectCardBody project={project} priority={priority} />;

  // Cards without a verified public URL render as plain content rather than
  // linking somewhere invented.
  if (!project.href) {
    return <article className={cn(shell, className)}>{body}</article>;
  }

  if (project.external) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className={cn(shell, interactive, className)}
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={project.href} className={cn(shell, interactive, className)}>
      {body}
    </Link>
  );
}

function ProjectCardBody({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) {
  const linked = Boolean(project.href);

  return (
    <>
      <div
        className={cn(
          "relative aspect-16/10 w-full overflow-hidden rounded-xl ring-1 ring-[var(--image-ring)]",
          "transition-[box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
          linked && "group-hover:ring-[var(--border-strong)]",
        )}
      >
        <Image
          src={project.image}
          alt={project.alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 280px"
          className={cn(
            "object-cover transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
            linked && "group-hover:scale-[1.02] group-focus-visible:scale-[1.02]",
          )}
        />
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <h3
          className={cn(
            "text-label font-semibold text-ink-2 transition-colors duration-200",
            linked
              ? "group-hover:text-ink group-focus-visible:text-ink"
              : "text-ink",
          )}
        >
          {project.title}
        </h3>
        {linked ? (
          <ArrowUpRight
            aria-hidden="true"
            className="mt-px size-3.5 shrink-0 text-ink-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          />
        ) : null}
      </div>

      <p className="mt-1 flex-1 text-label text-ink-2">{project.description}</p>

      <div className="mt-3 flex items-center justify-between gap-3">
        {project.stack.length > 0 ? (
          <TechIconStack items={project.stack} spreadOnGroupHover={linked} />
        ) : (
          <span />
        )}
        <span className="text-meta text-ink-3">{project.context}</span>
      </div>
    </>
  );
}
