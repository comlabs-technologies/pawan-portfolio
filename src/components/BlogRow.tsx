import Link from "next/link";
import type { Article } from "@/data/articles";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function BlogRow({ article, className }: { article: Article; className?: string }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
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
          {article.title}
        </h3>
        <time
          dateTime={article.date}
          className="shrink-0 text-meta text-ink-3 sm:text-label"
        >
          {formatDate(article.date)}
        </time>
      </div>
      <p className="mt-1 max-w-[62ch] text-label text-ink-2">{article.excerpt}</p>
    </Link>
  );
}
