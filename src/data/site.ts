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
  name: "Pawan Mishra",
  shortName: "Pawan",
  role: "Software Engineer",
  /** Cycled by the rotating badge next to the name. */
  roles: [
    "Software Engineer",
    "Full Stack Engineer",
    "Frontend Engineer",
    "Product Engineer",
    "Technical Consultant",
  ],
  headline: "Building what actually moves businesses: Interfaces to AI workflows",
  location: "Pune, Maharashtra, India",
  url: "https://pawan-ivory.vercel.app",
  avatar: "/images/people/pawan.png",
  intro:
    "I build the interfaces and technical workflows that move businesses forward — from polished product experiences to cloud-backed operational systems.",
  aboutIntro:
    "I am a product-minded software engineer who works directly with founders and business teams. I turn loosely defined operational problems into usable interfaces, workflows and production systems.",
  availability:
    "I work with founders and business teams on interfaces, workflows and production systems. If you have a process that needs to become software, send me a note.",
  description:
    "Pawan Mishra is a product-minded software engineer in Pune, working across frontend engineering, full-stack development, cloud infrastructure and product discovery.",
} as const;

export const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Thinking", href: "/thinking" },
  { label: "Contact", href: "/contact" },
];

/**
 * Only verified profiles are listed. Controls for unverified accounts stay
 * hidden until a confirmed URL is supplied.
 */
export const socials: SocialLink[] = [
  { label: "LinkedIn", href: "https://in.linkedin.com/in/pmbpgc7", icon: "linkedin" },
];
