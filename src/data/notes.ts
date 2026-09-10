import { socials } from "./site";

export type Note = {
  title: string;
  summary: string;
};

/**
 * Subjects Pawan writes about on LinkedIn. Individual post URLs are not
 * published here yet, so the section links to the profile itself rather than
 * inventing article pages or publication dates.
 */
export const notes: Note[] = [
  {
    title: "AI workflows and context engineering",
    summary:
      "What actually determines whether an AI feature is useful in a business: the context it is given, the boundaries around it, and the workflow it sits inside.",
  },
  {
    title: "Data lakes as organisational memory",
    summary:
      "Treating accumulated operational data as something a company can reason with, rather than as storage nobody revisits after the migration.",
  },
  {
    title: "Agentic software development",
    summary:
      "Where autonomous tooling genuinely shortens the path from problem to shipped software, and where it quietly adds review work instead.",
  },
  {
    title: "Product judgment in an AI-assisted engineering environment",
    summary:
      "Code generation has moved the bottleneck. Deciding what deserves to be built, and what a system should refuse to do, is the part that still needs a person.",
  },
  {
    title: "Translating business problems into software systems",
    summary:
      "The work between a founder describing a process out loud and a production interface that a team will actually keep using.",
  },
];

export const notesProfileUrl =
  socials.find((social) => social.icon === "linkedin")?.href ??
  "https://in.linkedin.com/in/pmbpgc7";
