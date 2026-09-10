import { outcomes } from "@/data/outcomes";
import { cn } from "@/lib/utils";
import { StaggerGroup, StaggerItem } from "./StaggerGroup";

/** Factual delivery outcomes, in place of client quotations. */
export function OutcomeCards() {
  return (
    <StaggerGroup
      className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
      stagger={0.08}
      as="ul"
    >
      {outcomes.map((outcome) => (
        <StaggerItem key={outcome.headline} as="li">
          <div
            className={cn(
              "h-full rounded-xl border border-line bg-content p-4",
              "transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "hover:border-line-strong hover:shadow-[var(--shadow-lift)]",
            )}
          >
            <p className="text-label font-semibold text-ink">{outcome.headline}</p>
            <p className="mt-1.5 text-label text-ink-2">{outcome.detail}</p>
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
