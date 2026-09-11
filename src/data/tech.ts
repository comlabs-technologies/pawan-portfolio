export const techIcons = {
  nextjs: "https://cdn.simpleicons.org/nextdotjs/000000",
  react: "https://cdn.simpleicons.org/react/61DAFB",
  typescript: "https://cdn.simpleicons.org/typescript/3178C6",
  mongodb: "https://cdn.simpleicons.org/mongodb/47A248",
  aws:
    "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
  docker: "https://cdn.simpleicons.org/docker/2496ED",
  kubernetes: "https://cdn.simpleicons.org/kubernetes/326CE5",
  javascript: "https://cdn.simpleicons.org/javascript/F7DF1E",
  nodejs: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
  sql: "https://cdn.simpleicons.org/postgresql/4169E1",
  claude: "https://cdn.simpleicons.org/claude/D97757",
  chatgpt:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/ChatGPT-Logo.svg/1280px-ChatGPT-Logo.svg.png",
  cursor: "https://cdn.simpleicons.org/cursor/000000",
} as const;

export type TechIconKey = keyof typeof techIcons;

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
  icon: string;
  invertInDark?: boolean;
};

const extraIcons = {
  tailwind: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  shopify: "https://cdn.simpleicons.org/shopify/7AB55C",
  vercel: "https://cdn.simpleicons.org/vercel/000000",
  express: "https://cdn.simpleicons.org/express/000000",
  figma: "https://cdn.simpleicons.org/figma/F24E1E",
} as const;

export const techMarks: Record<TechKey, TechMark> = {
  typescript: { label: "TypeScript", icon: techIcons.typescript },
  javascript: { label: "JavaScript", icon: techIcons.javascript },
  react: { label: "React", icon: techIcons.react },
  next: { label: "Next.js", icon: techIcons.nextjs, invertInDark: true },
  tailwind: { label: "Tailwind CSS", icon: extraIcons.tailwind },
  node: { label: "Node.js", icon: techIcons.nodejs },
  express: { label: "Express", icon: extraIcons.express, invertInDark: true },
  mongodb: { label: "MongoDB", icon: techIcons.mongodb },
  aws: { label: "AWS", icon: techIcons.aws, invertInDark: true },
  shopify: { label: "Shopify", icon: extraIcons.shopify },
  vercel: { label: "Vercel", icon: extraIcons.vercel, invertInDark: true },
  figma: { label: "Figma", icon: extraIcons.figma },
};

export const techIconItems: {
  key: TechIconKey;
  label: string;
  src: string;
  invertInDark?: boolean;
}[] = [
  { key: "nextjs", label: "Next.js", src: techIcons.nextjs, invertInDark: true },
  { key: "react", label: "React", src: techIcons.react },
  { key: "typescript", label: "TypeScript", src: techIcons.typescript },
  { key: "javascript", label: "JavaScript", src: techIcons.javascript },
  { key: "nodejs", label: "Node.js", src: techIcons.nodejs },
  { key: "mongodb", label: "MongoDB", src: techIcons.mongodb },
  { key: "aws", label: "AWS", src: techIcons.aws, invertInDark: true },
  { key: "docker", label: "Docker", src: techIcons.docker },
  { key: "kubernetes", label: "Kubernetes", src: techIcons.kubernetes },
  { key: "sql", label: "PostgreSQL", src: techIcons.sql },
  { key: "claude", label: "Claude", src: techIcons.claude },
  { key: "chatgpt", label: "ChatGPT", src: techIcons.chatgpt },
  { key: "cursor", label: "Cursor", src: techIcons.cursor, invertInDark: true },
];
