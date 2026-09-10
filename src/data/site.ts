export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "x" | "linkedin" | "github";
};

export const site = {
  name: "Pawan Kumar",
  shortName: "Pawan",
  role: "Software Engineer",
  /** Cycled by the rotating badge next to the name. */
  roles: [
    "Software Engineer",
    "Full Stack Engineer",
    "Design Engineer",
    "Frontend Engineer",
    "Product Engineer",
  ],
  location: "Bengaluru, India",
  email: "hello@pawan.build",
  url: "https://pawan.build",
  avatar: "/images/people/pawan.png",
  intro:
    "I build product interfaces for teams that care about detail. Mostly TypeScript, design systems, and the unglamorous work that makes an app feel fast.",
  aboutIntro:
    "I have spent the last eight years shipping interfaces for data-heavy products — the kind where a 200ms regression is a support ticket. I care about typography, state machines, and writing the boring code that lets a team move quickly.",
  availability:
    "I am taking on one contract engagement per quarter, and I always read a note about an interesting product problem.",
  description:
    "Pawan Kumar is a software engineer working on design systems, product interfaces, and front-end performance.",
} as const;

export const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const socials: SocialLink[] = [
  { label: "X", href: "https://x.com/", icon: "x" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/", icon: "github" },
];
