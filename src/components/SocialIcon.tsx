import type { SocialLink } from "@/data/site";

/** Original neutral glyphs rather than vendor brand artwork. */
export function SocialIcon({ icon }: { icon: SocialLink["icon"] }) {
  if (icon === "x") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
        <path
          d="M3 3l10 10M13 3L3 13"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  if (icon === "linkedin") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
        <rect
          x="1.6"
          y="1.6"
          width="12.8"
          height="12.8"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M5 6.6v4.2M5 4.6v.2M8 10.8V6.6M8 8.1c0-.9.6-1.5 1.5-1.5s1.5.6 1.5 1.5v2.7"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
      <rect
        x="1.6"
        y="1.6"
        width="12.8"
        height="12.8"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M5.4 4.6v2.2a1.6 1.6 0 001.6 1.6h2a1.6 1.6 0 011.6 1.6v1.4M5.4 11.4V9.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="5.4" cy="12.2" r="0.9" fill="currentColor" />
      <circle cx="10.6" cy="12.2" r="0.9" fill="currentColor" />
    </svg>
  );
}
