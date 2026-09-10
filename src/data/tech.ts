/** Technology marks are drawn as original monogram glyphs, never vendor artwork. */
export type TechKey =
  | "typescript"
  | "react"
  | "next"
  | "tailwind"
  | "node"
  | "postgres"
  | "graphql"
  | "redis"
  | "rust"
  | "python"
  | "aws"
  | "figma"
  | "motion"
  | "webgl"
  | "go";

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
  react: { label: "React", short: "Re", bg: "#149eca", fg: "#04212b" },
  next: { label: "Next.js", short: "N", bg: "#111111", fg: "#ffffff" },
  tailwind: { label: "Tailwind CSS", short: "Tw", bg: "#2eb3c4", fg: "#04262b" },
  node: { label: "Node.js", short: "No", bg: "#3f8f47", fg: "#f2fbf3" },
  postgres: { label: "PostgreSQL", short: "Pg", bg: "#31648c", fg: "#eef5fa" },
  graphql: { label: "GraphQL", short: "GQ", bg: "#c23591", fg: "#ffffff" },
  redis: { label: "Redis", short: "Rd", bg: "#b3352c", fg: "#fdeceb" },
  rust: { label: "Rust", short: "Rs", bg: "#6a4028", fg: "#f7ece3" },
  python: { label: "Python", short: "Py", bg: "#3b6f9e", fg: "#fdf4d8" },
  aws: { label: "AWS", short: "Aw", bg: "#8a5a1f", fg: "#fff3e0" },
  figma: { label: "Figma", short: "Fg", bg: "#a259ff", fg: "#ffffff" },
  motion: { label: "Motion", short: "Mo", bg: "#e5b23c", fg: "#241c05" },
  webgl: { label: "WebGL", short: "GL", bg: "#5b4b8a", fg: "#f1ecff" },
  go: { label: "Go", short: "Go", bg: "#2b8fa8", fg: "#e9fbff" },
};
