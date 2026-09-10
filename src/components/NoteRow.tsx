import { ArrowUpRight } from "lucide-react";
import type { Note } from "@/data/notes";
import { cn } from "@/lib/utils";

/**
 * A subject Pawan writes about. Individual post URLs are not published yet,
 * so every row points at the LinkedIn profile rather than a fabricated page.
 */
export function NoteRow({
  note,
  href,
  className,
}: {
  note: Note;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group -mx-3 block rounded-lg px-3 py-3",
        "transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-muted focus-visible:bg-muted",
        className,
      )}
    >
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3
          className={cn(
            "text-label font-semibold text-ink-2",
            "transition-[color,transform] duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
            "group-hover:translate-x-0.5 group-hover:text-ink",
            "group-focus-visible:translate-x-0.5 group-focus-visible:text-ink",
          )}
        >
          {note.title}
        </h3>
        <span className="inline-flex shrink-0 items-center gap-1 text-meta text-ink-3">
          On LinkedIn
          <ArrowUpRight
            aria-hidden="true"
            className="size-3 opacity-0 transition-opacity duration-[180ms] group-hover:opacity-100 group-focus-visible:opacity-100"
          />
        </span>
      </div>
      <p className="mt-1 max-w-[62ch] text-label text-ink-2">{note.summary}</p>
    </a>
  );
}
