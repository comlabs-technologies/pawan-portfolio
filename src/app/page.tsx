import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionFrame } from "@/components/SectionFrame";
import { ProjectCard } from "@/components/ProjectCard";
import { BlogRow } from "@/components/BlogRow";
import { ExperienceItem } from "@/components/ExperienceItem";
import { TestimonialMarquee } from "@/components/TestimonialMarquee";
import { EmailEnquiry } from "@/components/EmailEnquiry";
import { Reveal } from "@/components/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/StaggerGroup";
import { featuredProjects } from "@/data/projects";
import { latestArticles } from "@/data/articles";
import { experience } from "@/data/experience";
import { site } from "@/data/site";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />

      <SectionFrame aria-labelledby="projects-heading">
        <SectionHeading id="projects-heading">Selected projects</SectionHeading>

        <StaggerGroup
          className="mt-5 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.09}
        >
          {featuredProjects.map((project, index) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} priority={index === 0} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.2} className="mt-6">
          <Link
            href="/projects"
            className="text-label text-ink-2 underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-current"
          >
            All projects
          </Link>
        </Reveal>
      </SectionFrame>

      <section aria-labelledby="writing-heading" className="mt-10">
        <SectionHeading id="writing-heading">Latest writing</SectionHeading>

        <StaggerGroup className="mt-4 space-y-1" stagger={0.08}>
          {latestArticles.map((article) => (
            <StaggerItem key={article.slug}>
              <BlogRow article={article} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.15} className="mt-4">
          <Link
            href="/blog"
            className="text-label text-ink-2 underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-current"
          >
            All writing
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

        <Reveal delay={0.1} className="mt-5 -mx-4 md:-mx-8">
          <div className="px-4 md:px-8">
            <TestimonialMarquee />
          </div>
        </Reveal>
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
