import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionFrame } from "@/components/SectionFrame";
import { TravelGallery } from "@/components/TravelGallery";
import { Timeline } from "@/components/Timeline";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: site.aboutIntro,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${site.name}`,
    description: site.aboutIntro,
    url: `${site.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About me" description={site.aboutIntro} />

      <Reveal className="mt-6 space-y-4" delay={0.1}>
        <p className="max-w-[64ch] text-label text-ink-2">
          I started out building marketing sites for founders who could not afford a studio,
          which taught me more about constraints than any course would have. These days I work
          on the parts of a product people use every day: tables that hold ten thousand rows,
          forms that survive a dropped connection, and the design system that keeps the rest of
          it coherent.
        </p>
        <p className="max-w-[64ch] text-label text-ink-2">
          I am based in {site.location}, and I spend an unreasonable amount of my spare time
          walking up hills in order to look at other hills. The photographs below are from that
          habit — drag them around, they are not precious.
        </p>
      </Reveal>

      <section aria-labelledby="travel-heading" className="mt-12">
        <SectionHeading id="travel-heading">Places I have wandered</SectionHeading>
        <p className="mt-2 text-meta text-ink-3">
          Drag a photograph to move it. Everything stays where you leave it.
        </p>
        <div className="mt-4">
          <TravelGallery />
        </div>
      </section>

      <SectionFrame aria-labelledby="timeline-heading">
        <SectionHeading id="timeline-heading">Milestones</SectionHeading>
        <Timeline />
      </SectionFrame>

      <section aria-labelledby="values-heading" className="mt-10">
        <SectionHeading id="values-heading">How I like to work</SectionHeading>
        <Reveal className="mt-4" delay={0.08}>
          <ul className="max-w-[64ch] space-y-3 text-label text-ink-2">
            <li>
              <span className="font-medium text-ink">Measure before rewriting.</span> Most
              performance problems are not where the team assumes they are, and an afternoon
              with a profiler routinely saves a fortnight of refactoring.
            </li>
            <li>
              <span className="font-medium text-ink">Write it down.</span> A short decision
              record beats a long meeting, and the person it helps most is usually me, six
              months later.
            </li>
            <li>
              <span className="font-medium text-ink">Ship the unglamorous part.</span> Empty
              states, error copy, and keyboard focus are the difference between a demo and a
              product.
            </li>
          </ul>
        </Reveal>
      </section>
    </>
  );
}
