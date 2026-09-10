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
      className={cn("section-inset relative my-10 border-y border-line py-6", className)}
      {...rest}
    >
      {dots ? <DecorDots /> : null}
      {children}
    </section>
  );
}
