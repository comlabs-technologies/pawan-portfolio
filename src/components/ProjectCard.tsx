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
  /** Homepage selected work matches the flat showcase layout. */
  variant?: "default" | "featured";
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

export function ProjectCard({
  project,
  priority = false,
  className,
  variant = "default",
}: ProjectCardProps) {
  const featured = variant === "featured";
  const body = <ProjectCardBody project={project} priority={priority} featured={featured} />;
  const classes = cn(
    featured ? "group flex h-full flex-col" : shell,
    !featured && interactive,
    className,
  );

  if (!project.href) {
    return <article className={classes}>{body}</article>;
  }

  if (project.external) {
    return (
      <a href={project.href} target="_blank" rel="noreferrer" className={classes}>
        {body}
      </a>
    );
  }

  return (
    <Link href={project.href} className={classes}>
      {body}
    </Link>
  );
}

function FeaturedPreview({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) {
  const preview = project.preview ?? { top: "6%", left: "6%", width: "108%" };

  return (
    <div className="relative aspect-[10/11] w-full overflow-hidden rounded-[1.25rem] bg-[#0a0a0a]">
      {preview.blank ? (
        <div
          aria-hidden="true"
          className="absolute rounded-xl"
          style={{
            top: preview.top,
            left: preview.left,
            width: preview.width,
            height: "88%",
            backgroundColor: preview.placeholderColor ?? "#efb7b7",
          }}
        />
      ) : (
        <div
          className="absolute overflow-hidden rounded-xl shadow-[0_10px_28px_rgba(0,0,0,0.38)]"
          style={{
            top: preview.top,
            left: preview.left,
            width: preview.width,
          }}
        >
          <Image
            src={project.image}
            alt={project.alt}
            width={700}
            height={900}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 300px"
            className="h-auto w-full"
          />
        </div>
      )}
    </div>
  );
}

function ProjectCardBody({
  project,
  priority,
  featured,
}: {
  project: Project;
  priority: boolean;
  featured: boolean;
}) {
  const linked = Boolean(project.href);

  return (
    <>
      {featured ? (
        <FeaturedPreview project={project} priority={priority} />
      ) : (
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-xl bg-muted ring-1 ring-[var(--image-ring)]",
            linked && "group-hover:ring-[var(--border-strong)]",
            "transition-[box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
          )}
        >
          <Image
            src={project.image}
            alt={project.alt}
            width={1896}
            height={902}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 280px"
            className="h-auto w-full object-contain"
          />
        </div>
      )}

      <div className={cn("flex items-start justify-between gap-2", featured ? "mt-4" : "mt-3")}>
        <h3
          className={cn(
            featured
              ? "text-[0.9375rem] font-semibold leading-5 text-ink"
              : "text-label font-semibold transition-colors duration-200",
            !featured &&
              (linked
                ? "text-ink-2 group-hover:text-ink group-focus-visible:text-ink"
                : "text-ink"),
          )}
        >
          {project.title}
        </h3>
        {!featured && linked ? (
          <ArrowUpRight
            aria-hidden="true"
            className="mt-px size-3.5 shrink-0 text-ink-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          />
        ) : null}
      </div>

      <p
        className={cn(
          "flex-1 text-ink-2",
          featured ? "mt-2 text-[0.875rem] leading-5" : "mt-1 text-label leading-relaxed",
        )}
      >
        {project.description}
      </p>

      {project.stack.length > 0 ? (
        <div className={cn(featured ? "mt-4" : "mt-3 flex items-center justify-between gap-3")}>
          <TechIconStack
            items={project.stack}
            spreadOnGroupHover={!featured && linked}
            size={featured ? "md" : "sm"}
          />
          {!featured ? <span className="text-meta text-ink-3">{project.context}</span> : null}
        </div>
      ) : featured ? null : (
        <div className="mt-3 flex justify-end">
          <span className="text-meta text-ink-3">{project.context}</span>
        </div>
      )}
    </>
  );
}
