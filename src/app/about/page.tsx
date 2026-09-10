import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionFrame } from "@/components/SectionFrame";
import { PrincipleList } from "@/components/PrincipleList";
import { Timeline } from "@/components/Timeline";
import { Reveal } from "@/components/Reveal";
import { credentials } from "@/data/credentials";
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
          My work spans frontend engineering, full-stack development, cloud
          infrastructure, product discovery and client communication. In practice that
          means sitting in the conversation where a business process is described out
          loud, and staying with it until there is something in production that the team
          uses every day.
        </p>
        <p className="max-w-[64ch] text-label text-ink-2">
          I am based in {site.location}, and I currently work as a software engineer at
          Vionsys IT Solutions, where I own the company website and client-facing web
          products. Before that I worked directly with founders across education,
          professional networking, enterprise services and ecommerce.
        </p>
      </Reveal>

      <section aria-labelledby="principles-heading" className="mt-12">
        <SectionHeading id="principles-heading">How I work</SectionHeading>
        <PrincipleList />
      </section>

      <SectionFrame aria-labelledby="credentials-heading">
        <SectionHeading id="credentials-heading">Education and leadership</SectionHeading>
        <Timeline groups={credentials} />
      </SectionFrame>
    </>
  );
}
