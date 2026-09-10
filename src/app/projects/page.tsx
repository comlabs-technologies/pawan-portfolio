import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { StaggerGroup, StaggerItem } from "@/components/StaggerGroup";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

const description =
  "Product work with founders and client teams: platforms, company websites, storefronts, operational systems and research.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects — ${site.name}`,
    description,
    url: `${site.url}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader title="Projects" description={description} />

      <StaggerGroup
        className="mt-10 grid grid-cols-1 gap-x-4 gap-y-9 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.08}
      >
        {projects.map((project, index) => (
          <StaggerItem key={project.slug}>
            <ProjectCard project={project} priority={index < 3} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </>
  );
}
