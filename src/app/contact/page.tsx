import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

const description =
  "Tell me about the product problem you are stuck on. I read everything and reply within two working days.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${site.name}`,
    description,
    url: `${site.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact" description={description} />

      <Reveal delay={0.1} className="mt-8">
        <ContactForm />
      </Reveal>

      <Reveal delay={0.2} className="mt-10 border-t border-line pt-6">
        <dl className="grid gap-4 text-label sm:grid-cols-2">
          <div>
            <dt className="text-meta text-ink-3">Email</dt>
            <dd className="mt-0.5 text-ink">{site.email}</dd>
          </div>
          <div>
            <dt className="text-meta text-ink-3">Based in</dt>
            <dd className="mt-0.5 text-ink">{site.location}</dd>
          </div>
          <div>
            <dt className="text-meta text-ink-3">Availability</dt>
            <dd className="mt-0.5 text-ink-2">One contract engagement per quarter.</dd>
          </div>
          <div>
            <dt className="text-meta text-ink-3">Response time</dt>
            <dd className="mt-0.5 text-ink-2">Within two working days.</dd>
          </div>
        </dl>
      </Reveal>
    </>
  );
}
