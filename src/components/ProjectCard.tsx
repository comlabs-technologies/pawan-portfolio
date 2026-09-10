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

export function ProjectCard({ project, priority = false, className }: ProjectCardProps) {
  const Wrapper = project.external ? "a" : Link;
  const linkProps = project.external
    ? { href: project.href, target: "_blank", rel: "noreferrer" }
    : { href: project.href };

  return (
    <Wrapper
      {...(linkProps as { href: string })}
      className={cn(
        "group relative flex flex-col rounded-xl p-2 -m-2",
        "transition-[background-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:bg-muted/60 hover:shadow-[var(--shadow-lift)]",
        "focus-visible:bg-muted/60 focus-visible:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl ring-1 ring-[var(--image-ring)]">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 280px"
          className="object-cover transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
        />
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <h3 className="text-label font-semibold text-ink-2 transition-colors duration-200 group-hover:text-ink group-focus-visible:text-ink">
          {project.title}
        </h3>
        <ArrowUpRight
          aria-hidden="true"
          className="mt-px size-3.5 shrink-0 text-ink-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        />
      </div>

      <p className="mt-1 text-label text-ink-2">{project.description}</p>

      <TechIconStack items={project.stack} className="mt-3" spreadOnGroupHover />
    </Wrapper>
  );
}
