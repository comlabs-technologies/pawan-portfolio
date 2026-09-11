import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandIconProps = {
  src: string;
  label: string;
  invertInDark?: boolean;
  size?: number;
  decorative?: boolean;
  className?: string;
};

export function BrandIcon({
  src,
  label,
  invertInDark = false,
  size = 16,
  decorative = false,
  className,
}: BrandIconProps) {
  return (
    <Image
      src={src}
      alt={decorative ? "" : label}
      width={size}
      height={size}
      unoptimized
      className={cn("object-contain", invertInDark && "dark:invert", className)}
    />
  );
}
