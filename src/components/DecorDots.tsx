import { cn } from "@/lib/utils";

/** Four faint corner dots that mark a framed section. */
export function DecorDots({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      {[
        "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
        "right-0 top-0 translate-x-1/2 -translate-y-1/2",
        "left-0 bottom-0 -translate-x-1/2 translate-y-1/2",
        "right-0 bottom-0 translate-x-1/2 translate-y-1/2",
      ].map((position, index) => (
        <span
          key={position}
          className={cn(
            "decor-dot absolute size-1 rounded-full bg-ink-3/70",
            position,
          )}
          style={{ animationDelay: `${index * 0.25}s` }}
        />
      ))}
    </span>
  );
}
