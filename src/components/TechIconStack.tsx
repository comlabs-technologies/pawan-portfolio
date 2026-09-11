import { techMarks, type TechKey } from "@/data/tech";
import { cn } from "@/lib/utils";
import { BrandIcon } from "./BrandIcon";

type TechIconStackProps = {
  items: TechKey[];
  className?: string;
  /** Spreads apart when the parent `group` is hovered. */
  spreadOnGroupHover?: boolean;
  /** Keeps icons spread in the resting state. */
  spread?: boolean;
  size?: "sm" | "md";
};

export function TechIconStack({
  items,
  className,
  spreadOnGroupHover = false,
  spread = false,
  size = "sm",
}: TechIconStackProps) {
  return (
    <ul className={cn("flex items-center", className)}>
      {items.map((key, index) => {
        const mark = techMarks[key];
        const pixel = size === "sm" ? 12 : 16;
        return (
          <li
            key={key}
            style={{ "--i": index } as React.CSSProperties}
            className={cn(
              "grid place-items-center rounded-full border border-line bg-content",
              "transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
              size === "sm" ? "size-5" : "size-8",
              index > 0 && (size === "sm" ? "-ml-1.5" : "-ml-2.5"),
              spread && "translate-x-[calc(var(--i)*1.5px)]",
              spreadOnGroupHover &&
                "group-hover:translate-x-[calc(var(--i)*1.5px)] group-focus-visible:translate-x-[calc(var(--i)*1.5px)]",
            )}
            title={mark.label}
          >
            <span className="sr-only">{mark.label}</span>
            <BrandIcon
              src={mark.icon}
              label={mark.label}
              invertInDark={mark.invertInDark}
              size={pixel}
              decorative
              className={size === "sm" ? "size-3" : "size-4"}
            />
          </li>
        );
      })}
    </ul>
  );
}
