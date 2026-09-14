import type { ProjectSiteLink } from "@/data/project-sites";
import { cn } from "@/lib/utils";

export function ProjectSiteRow({
  link,
  className,
}: {
  link: ProjectSiteLink;
  className?: string;
}) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "flex items-baseline justify-between gap-4 py-4",
        "border-b border-line transition-colors hover:bg-muted/50",
        className,
      )}
    >
      <span className="min-w-0 truncate text-label text-ink">{link.label}</span>
      <span className="shrink-0 text-meta text-ink-3">{link.meta}</span>
    </a>
  );
}
