import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20">
      <h1 className="heading-display text-title-sm md:text-title">
        Page not found
      </h1>
      <p className="mt-3 max-w-[52ch] text-body text-ink-2">
        That address does not lead anywhere. The link may be out of date, or the page may have
        been renamed.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-11 items-center text-label text-ink-2 underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-current"
      >
        Back to the homepage
      </Link>
    </div>
  );
}
