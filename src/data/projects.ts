import type { TechKey } from "./tech";

export type ProjectPreview = {
  top: string;
  left: string;
  width: string;
  blank?: boolean;
  placeholderColor?: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  /** Omitted until a verified public URL exists; the card then renders unlinked. */
  href?: string;
  external?: boolean;
  context: string;
  stack: TechKey[];
  featured?: boolean;
  preview?: ProjectPreview;
};

export const projects: Project[] = [
  {
    slug: "cleanly",
    title: "Cleanly",
    description:
      "A streamlined home-services platform that turns service discovery, scheduling and booking management into one clear customer journey.",
    image: "/images/projects/cleanly-preview.png",
    alt: "Cleanly product interface showing account balances and digital assets",
    context: "Product Design & Development",
    stack: ["next", "react", "typescript"],
    featured: true,
    preview: {
      top: "6%",
      left: "6%",
      width: "108%",
    },
  },
  {
    slug: "comlabs-technologies",
    title: "Comlabs Technologies",
    description:
      "Built the digital presence and product direction for a technology partner delivering application support, AWS cloud, AI agents and custom software engineering.",
    image: "/images/projects/comlabs.png",
    alt: "Comlabs Technologies homepage preview",
    href: "https://www.comlabstechnologies.com/",
    external: true,
    context: "Technology Company · Founder",
    stack: ["next", "react", "aws"],
    featured: true,
    preview: {
      top: "6%",
      left: "6%",
      width: "108%",
      blank: true,
      placeholderColor: "#efb7b7",
    },
  },
  {
    slug: "humanmadelogic",
    title: "HumanMadeLogic",
    description:
      "Rebuilt a WordPress marketing website in Next.js with sharper positioning, improved performance and a cleaner conversion-focused experience.",
    image: "/images/projects/humanmadelogic-preview.png",
    alt: "HumanMadeLogic homepage with layered brand visuals and bold positioning",
    href: "https://humanmadelogic.vercel.app/",
    external: true,
    context: "Website Redesign · Next.js",
    stack: ["next", "react", "tailwind"],
    featured: true,
    preview: {
      top: "6%",
      left: "6%",
      width: "108%",
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
