import { principles } from "@/data/principles";
import { StaggerGroup, StaggerItem } from "./StaggerGroup";

export function PrincipleList() {
  return (
    <StaggerGroup className="mt-5 space-y-5" stagger={0.08} as="ol">
      {principles.map((principle, index) => (
        <StaggerItem key={principle.title} as="li">
          <div className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md bg-muted text-meta font-semibold text-ink-2 shadow-[var(--shadow-badge)]"
            >
              {index + 1}
            </span>
            <div className="min-w-0">
              <h3 className="text-label font-medium text-ink">{principle.title}</h3>
              <p className="mt-1 max-w-[64ch] text-label text-ink-2">{principle.detail}</p>
            </div>
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
