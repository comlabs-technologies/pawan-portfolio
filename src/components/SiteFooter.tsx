import Link from "next/link";
import { site, socials } from "@/data/site";
import { SocialIcon } from "./SocialIcon";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line pt-5 pb-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-meta text-ink-3">
          Built with care by{" "}
          <Link
            href="/about"
            className="text-ink-2 underline decoration-line-strong underline-offset-2 transition-colors hover:text-ink hover:decoration-current"
          >
            {site.name}
          </Link>
        </p>

        <ul className="flex items-center gap-1">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="me noreferrer"
                aria-label={`${site.shortName} on ${social.label}`}
                className="grid size-11 place-items-center rounded-full text-ink-3 transition-colors duration-200 hover:bg-muted hover:text-ink"
              >
                <SocialIcon icon={social.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
