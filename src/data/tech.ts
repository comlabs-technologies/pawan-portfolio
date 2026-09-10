/** Technology marks are drawn as original monogram glyphs, never vendor artwork. */
export type TechKey =
  | "typescript"
  | "javascript"
  | "react"
  | "next"
  | "tailwind"
  | "node"
  | "express"
  | "mongodb"
  | "aws"
  | "shopify"
  | "vercel"
  | "figma";

export type TechMark = {
  label: string;
  short: string;
  /** Background of the circular chip. */
  bg: string;
  /** Foreground of the monogram. */
  fg: string;
};

export const techMarks: Record<TechKey, TechMark> = {
  typescript: { label: "TypeScript", short: "TS", bg: "#2f6fd0", fg: "#ffffff" },
  javascript: { label: "JavaScript", short: "JS", bg: "#c9a227", fg: "#241c05" },
  react: { label: "React", short: "Re", bg: "#149eca", fg: "#04212b" },
  next: { label: "Next.js", short: "N", bg: "#111111", fg: "#ffffff" },
  tailwind: { label: "Tailwind CSS", short: "Tw", bg: "#2eb3c4", fg: "#04262b" },
  node: { label: "Node.js", short: "No", bg: "#3f8f47", fg: "#f2fbf3" },
  express: { label: "Express", short: "Ex", bg: "#4a4a4a", fg: "#f5f5f5" },
  mongodb: { label: "MongoDB", short: "Mo", bg: "#3d7a45", fg: "#eefaef" },
  aws: { label: "AWS", short: "Aw", bg: "#8a5a1f", fg: "#fff3e0" },
  shopify: { label: "Shopify", short: "Sh", bg: "#4a7c33", fg: "#f1fae8" },
  vercel: { label: "Vercel", short: "Ve", bg: "#171717", fg: "#fafafa" },
  figma: { label: "Figma", short: "Fg", bg: "#a259ff", fg: "#ffffff" },
};
