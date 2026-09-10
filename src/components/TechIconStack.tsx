import { techMarks, type TechKey } from "@/data/tech";
import { cn } from "@/lib/utils";

type TechIconStackProps = {
  items: TechKey[];
  className?: string;
  /** Spreads apart when the parent `group` is hovered. */
  spreadOnGroupHover?: boolean;
  size?: "sm" | "md";
};

export function TechIconStack({
  items,
  className,
  spreadOnGroupHover = false,
  size = "sm",
}: TechIconStackProps) {
  return (
    <ul className={cn("flex items-center", className)}>
      {items.map((key, index) => {
        const mark = techMarks[key];
        return (
          <li
            key={key}
            style={{ "--i": index } as React.CSSProperties}
            className={cn(
              "grid place-items-center rounded-full ring-2 ring-content",
              "transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
              size === "sm" ? "size-5 text-[8px]" : "size-6 text-[9px]",
              index > 0 && (size === "sm" ? "-ml-1.5" : "-ml-2"),
              spreadOnGroupHover &&
                "group-hover:translate-x-[calc(var(--i)*1.5px)] group-focus-visible:translate-x-[calc(var(--i)*1.5px)]",
            )}
          >
            <span
              className="grid size-full place-items-center rounded-full font-semibold tracking-tight"
              style={{ backgroundColor: mark.bg, color: mark.fg }}
              title={mark.label}
            >
              <span className="sr-only">{mark.label}</span>
              <span aria-hidden="true">{mark.short}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
