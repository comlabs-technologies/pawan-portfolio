"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

/**
 * Both icons are always rendered and swapped by the `dark` class, which
 * keeps the button free of hydration state and free of a first-paint flash.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const toggle = useCallback(() => {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage can be unavailable; the toggle still works for this session */
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      title="Toggle colour theme"
      className={cn(
        "group relative grid size-11 place-items-center overflow-hidden rounded-full",
        "text-ink-2 transition-colors duration-200 hover:text-ink",
        "hover:bg-muted active:scale-[0.97]",
        className,
      )}
    >
      {/* Diagonal shine sweep on interaction */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -translate-x-full opacity-0",
          "bg-linear-[115deg,transparent_35%,var(--color-ink)_50%,transparent_65%]",
          "transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "group-hover:translate-x-full group-hover:opacity-[0.07]",
          "group-focus-visible:translate-x-full group-focus-visible:opacity-[0.07]",
        )}
      />
      <span className="relative grid size-4 place-items-center">
        <Sun
          aria-hidden="true"
          className={cn(
            "col-start-1 row-start-1 size-4 -rotate-90 scale-75 opacity-0",
            "transition-[transform,opacity] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
            "dark:rotate-0 dark:scale-100 dark:opacity-100",
          )}
        />
        <Moon
          aria-hidden="true"
          className={cn(
            "col-start-1 row-start-1 size-4 opacity-100",
            "transition-[transform,opacity] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
            "dark:rotate-90 dark:scale-75 dark:opacity-0",
          )}
        />
      </span>
    </button>
  );
}
