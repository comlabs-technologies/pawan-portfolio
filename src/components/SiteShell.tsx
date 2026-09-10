import { FloatingNavbar } from "./FloatingNavbar";
import { SiteFooter } from "./SiteFooter";

/**
 * The narrow editorial canvas: a white (or near-black) column between two
 * patterned rails that run the full height of the document.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh justify-center bg-page">
      <div className="flex w-full max-w-shell items-stretch">
        <div
          aria-hidden="true"
          className="rail-pattern w-4 shrink-0 border-r border-line bg-page"
        />

        <div className="flex min-w-0 flex-1 flex-col bg-content">
          <FloatingNavbar />
          <main id="content" className="flex-1 px-4 pt-6 md:px-8 md:pt-8">
            {children}
            <SiteFooter />
          </main>
        </div>

        <div
          aria-hidden="true"
          className="rail-pattern w-4 shrink-0 border-l border-line bg-page"
        />
      </div>
    </div>
  );
}
