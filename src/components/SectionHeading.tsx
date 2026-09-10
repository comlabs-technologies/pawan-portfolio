import { AnimatedHeading } from "./AnimatedHeading";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  children: string;
  className?: string;
  id?: string;
  as?: "h2" | "h3";
};

/** The restrained section label used to open every block of content. */
export function SectionHeading({ children, className, id, as = "h2" }: SectionHeadingProps) {
  return (
    <AnimatedHeading
      as={as}
      id={id}
      text={children}
      className={cn("text-body font-medium tracking-[-0.01em] text-ink", className)}
    />
  );
}
