import { cn } from "@/lib/utils";

/** A neutral monogram used in place of any real company logo. */
export function CompanyMark({
  mark,
  color,
  company,
  className,
}: {
  mark: string;
  color: string;
  company: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-grid size-7 place-items-center rounded-md text-[10px] font-semibold tracking-tight text-white",
        "ring-1 ring-inset ring-black/10",
        className,
      )}
      style={{ backgroundColor: color }}
    >
      <span className="sr-only">{company}</span>
      <span aria-hidden="true">{mark}</span>
    </span>
  );
}
