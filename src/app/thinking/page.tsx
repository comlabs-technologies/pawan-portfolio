import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { NoteRow } from "@/components/NoteRow";
import { Reveal } from "@/components/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/StaggerGroup";
import { notes, notesProfileUrl } from "@/data/notes";
import { site } from "@/data/site";

const description =
  "Notes on AI workflows, organisational data, agentic development and the judgment involved in turning business problems into software.";

export const metadata: Metadata = {
  title: "Thinking",
  description,
  alternates: { canonical: "/thinking" },
  openGraph: {
    type: "website",
    title: `Thinking — ${site.name}`,
    description,
    url: `${site.url}/thinking`,
    images: [
      { url: "/images/og.png", width: 1200, height: 630, alt: `${site.name} — writing` },
    ],
  },
};

export default function ThinkingPage() {
  return (
    <>
      <PageHeader title="Thinking" description={description} />

      <Reveal delay={0.08} className="mt-6">
        <p className="max-w-[62ch] text-label text-ink-2">
          These are the subjects I post about on LinkedIn. Individual posts are not
          mirrored here yet, so each one opens the profile.
        </p>
      </Reveal>

      <StaggerGroup className="mt-6 space-y-1" stagger={0.07}>
        {notes.map((note) => (
          <StaggerItem key={note.title}>
            <NoteRow note={note} href={notesProfileUrl} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal delay={0.2} className="mt-8 border-t border-line pt-6">
        <a
          href={notesProfileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center text-label text-ink-2 underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-current"
        >
          Read the posts on LinkedIn
        </a>
      </Reveal>
    </>
  );
}
