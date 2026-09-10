import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { site, socials } from "@/data/site";

const description =
  "Tell me about the process you are trying to turn into software, and I will come back to you.";

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
  const linkedin = socials.find((social) => social.icon === "linkedin");

  return (
    <>
      <PageHeader title="Contact" description={description} />

      <Reveal delay={0.1} className="mt-8">
        <ContactForm />
      </Reveal>

      <Reveal delay={0.2} className="mt-10 border-t border-line pt-6">
        <dl className="grid gap-4 text-label sm:grid-cols-2">
          <div>
            <dt className="text-meta text-ink-3">Based in</dt>
            <dd className="mt-0.5 text-ink">{site.location}</dd>
          </div>
          <div>
            <dt className="text-meta text-ink-3">Currently</dt>
            <dd className="mt-0.5 text-ink-2">
              Software Engineer at Vionsys IT Solutions
            </dd>
          </div>
          {linkedin ? (
            <div>
              <dt className="text-meta text-ink-3">LinkedIn</dt>
              <dd className="mt-0.5">
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="me noreferrer"
                  className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-current"
                >
                  in/pmbpgc7
                </a>
              </dd>
            </div>
          ) : null}
          <div>
            <dt className="text-meta text-ink-3">Works on</dt>
            <dd className="mt-0.5 text-ink-2">
              Interfaces, operational workflows and cloud-backed systems
            </dd>
          </div>
        </dl>
      </Reveal>
    </>
  );
}
