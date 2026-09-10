"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navItems, site } from "@/data/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const MORPH_AT = 520;

export function FloatingNavbar() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [floating, setFloating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    setFloating(value > MORPH_AT);
  });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="sticky top-0 z-50 pt-3">
      <nav
        aria-label="Primary"
        data-floating={floating ? "true" : "false"}
        style={{
          /* Explicitly listed properties only — never `transition: all`. */
          transitionProperty:
            "width, border-radius, translate, box-shadow, background-color, backdrop-filter",
          transitionDuration: "400ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className={cn(
          "mx-auto flex h-14 max-w-canvas items-center justify-between gap-2 px-2 ring-1",
          floating
            ? cn(
                "w-[85%] translate-y-2.5 rounded-[64px]",
                "bg-[var(--nav-surface)] ring-[var(--nav-ring)] backdrop-blur-[8px]",
                "shadow-[0_1px_1px_var(--shade-soft),0_4px_8px_-4px_var(--shade-soft),0_16px_32px_-18px_var(--shade)]",
              )
            : "w-[92%] translate-y-0 rounded-[10px] bg-transparent shadow-none ring-transparent",
        )}
      >
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="group ml-1 flex size-11 items-center justify-center rounded-full"
        >
          <span className="relative block size-8 overflow-hidden rounded-full ring-1 ring-[var(--image-ring)] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]">
            <Image
              src={site.avatar}
              alt=""
              fill
              sizes="32px"
              priority
              className="object-cover"
            />
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          <ul className="hidden items-center gap-0.5 sm:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex h-11 items-center rounded-full px-3 text-label transition-colors duration-200",
                    isActive(item.href)
                      ? "bg-muted font-medium text-ink"
                      : "text-ink-2 hover:bg-muted hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full text-ink-2 transition-colors duration-200 hover:bg-muted hover:text-ink sm:hidden"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="size-4" />
            ) : (
              <Menu aria-hidden="true" className="size-4" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -6, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6, filter: "blur(6px)" }}
            transition={{ duration: 0.24, ease: EASE }}
            className="mx-auto mt-2 w-[92%] max-w-canvas sm:hidden"
          >
            <ul className="overflow-hidden rounded-xl border border-line bg-content/95 p-1 shadow-[var(--shadow-nav)] backdrop-blur-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center rounded-lg px-3 text-label transition-colors duration-200",
                      isActive(item.href)
                        ? "bg-muted font-medium text-ink"
                        : "text-ink-2 hover:bg-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
