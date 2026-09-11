export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "x" | "linkedin" | "github";
};

export const profile = {
  name: "Pawan Mishra",
  role: "Frontend Engineer & Product Builder",
  image:
    "https://media.licdn.com/dms/image/v2/D4D03AQGjzZ4jWrOyzQ/profile-displayphoto-scale_200_200/B4DZ5ZFUpXHgAc-/0/1779611028977?e=1790812800&v=beta&t=Z-r4LV9NK3mO0e7uaGiWRvK7mOLTlEOWhjel00hRjuA",
} as const;

export const site = {
  name: profile.name,
  shortName: "Pawan",
  role: profile.role,
  image: profile.image,
  /** Cycled by the rotating badge next to the name. */
  roles: [
    "Frontend Engineer & Product Builder",
    "Full Stack Engineer",
    "Frontend Engineer",
    "Product Engineer",
    "Technical Consultant",
  ],
  headline: "Building what actually moves businesses: Interfaces to AI workflows",
  location: "Pune, Maharashtra, India",
  url: "https://pawan-ivory.vercel.app",
  intro:
    "I build the interfaces and technical workflows that move businesses forward, from polished product experiences to cloud-backed operational systems.",
  aboutIntro:
    "I am a product-minded software engineer who works directly with founders and business teams. I turn loosely defined operational problems into usable interfaces, workflows and production systems.",
  availability:
    "I work with founders and business teams on interfaces, workflows and production systems. If you have a process that needs to become software, send me a note.",
  description:
    "Pawan Mishra is a frontend engineer and product builder in Pune, working across product experiences, web development and founder-led digital products.",
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
