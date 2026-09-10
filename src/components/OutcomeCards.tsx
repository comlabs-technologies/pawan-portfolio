import { outcomes } from "@/data/outcomes";
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
          <div className="h-full rounded-xl border border-line bg-content p-4">
            <p className="text-label font-semibold text-ink">{outcome.headline}</p>
            <p className="mt-1.5 text-label text-ink-2">{outcome.detail}</p>
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
