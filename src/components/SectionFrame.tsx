import { DecorDots } from "./DecorDots";
import { cn } from "@/lib/utils";

/** Bordered, softly inset band used for the framed sections. */
export function SectionFrame({
  children,
  className,
  dots = true,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  dots?: boolean;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("section-inset relative my-10 py-6", className)}
      {...rest}
    >
      <span aria-hidden="true" className="rule-x absolute inset-x-0 top-0" />
      <span aria-hidden="true" className="rule-x absolute inset-x-0 bottom-0" />
      {dots ? <DecorDots /> : null}
      {children}
    </section>
  );
}
