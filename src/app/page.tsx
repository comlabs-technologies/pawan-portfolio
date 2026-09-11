import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionFrame } from "@/components/SectionFrame";
import { ProjectCard } from "@/components/ProjectCard";
import { NoteRow } from "@/components/NoteRow";
import { ExperienceItem } from "@/components/ExperienceItem";
import { OutcomeCards } from "@/components/OutcomeCards";
import { TestimonialMarquee } from "@/components/TestimonialMarquee";
import { EmailEnquiry } from "@/components/EmailEnquiry";
import { TechMarquee } from "@/components/TechMarquee";
import { Reveal } from "@/components/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/StaggerGroup";
import { featuredProjects } from "@/data/projects";
import { notes, notesProfileUrl } from "@/data/notes";
import { experience } from "@/data/experience";
import { site } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section aria-labelledby="projects-heading" className="mt-10">
        <h2
          id="projects-heading"
          className="text-title-sm font-bold tracking-[-0.04em] text-ink md:text-[2rem] md:leading-[2.25rem]"
        >
          Selected work
        </h2>

        <StaggerGroup
          className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.09}
        >
          {featuredProjects.map((project, index) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} priority={index === 0} variant="featured" />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.2} className="mt-8">
          <Link
            href="/projects"
            className="text-label text-ink-2 underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-current"
          >
            All projects
          </Link>
        </Reveal>
      </section>

      <section aria-labelledby="thinking-heading" className="mt-10">
        <SectionHeading id="thinking-heading">Thinking</SectionHeading>
        <Reveal delay={0.06} className="mt-2">
          <p className="max-w-[62ch] text-meta text-ink-3">
            Subjects I write about on LinkedIn.
          </p>
        </Reveal>

        <StaggerGroup className="mt-3 space-y-1" stagger={0.08}>
          {notes.slice(0, 3).map((note) => (
            <StaggerItem key={note.title}>
              <NoteRow note={note} href={notesProfileUrl} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.15} className="mt-4">
          <Link
            href="/thinking"
            className="text-label text-ink-2 underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-current"
          >
            All subjects
          </Link>
        </Reveal>
      </section>

      <SectionFrame aria-labelledby="experience-heading">
        <SectionHeading id="experience-heading">Work experience</SectionHeading>

        <ul className="mt-5 space-y-7">
          {experience.map((item, index) => (
            <ExperienceItem key={item.company} item={item} index={index} />
          ))}
        </ul>
      </SectionFrame>

      <section aria-labelledby="testimonials-heading" className="mt-10">
        <SectionHeading id="testimonials-heading">People I have worked with</SectionHeading>

        {/* Bleeds to the canvas edges; the mask fade handles the entry and exit. */}
        <Reveal delay={0.1} className="mt-5 -mx-4 md:-mx-8">
          <TestimonialMarquee />
        </Reveal>
      </section>

      <section aria-labelledby="outcomes-heading" className="mt-10">
        <SectionHeading id="outcomes-heading">Selected outcomes</SectionHeading>
        <OutcomeCards />
      </section>

      <section aria-labelledby="tech-heading" className="mt-12">
        <SectionHeading id="tech-heading">Tech Stack and Tools</SectionHeading>
        <div className="mt-5 -mx-4 md:-mx-8">
          <TechMarquee />
        </div>
      </section>

      <section aria-labelledby="contact-heading" className="mt-12">
        <SectionHeading id="contact-heading">Get in touch</SectionHeading>

        <Reveal delay={0.08} className="mt-4">
          <p className="max-w-[56ch] text-label text-ink-2">{site.availability}</p>
          <EmailEnquiry />
          <p className="mt-3 text-meta text-ink-3">
            Prefer a longer note?{" "}
            <Link
              href="/contact"
              className="underline decoration-line-strong underline-offset-2 transition-colors hover:text-ink hover:decoration-current"
            >
              Use the full contact form
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </>
  );
}
