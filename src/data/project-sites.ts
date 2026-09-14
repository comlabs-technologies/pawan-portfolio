export type ProjectSiteLink = {
  label: string;
  href: string;
  /** Right column, aligned like dates in the archive-style list. */
  meta: string;
};

export const projectSiteLinks: ProjectSiteLink[] = [
  {
    label: "Formial.in",
    href: "https://formial.in",
    meta: "formial.in",
  },
  {
    label: "Docrud.com",
    href: "https://docrud.com",
    meta: "docrud.com",
  },
  {
    label: "culinaapp.in",
    href: "https://culinaapp.in/",
    meta: "culinaapp.in",
  },
  {
    label: "Humanmadelogic.fun",
    href: "https://humanmadelogic.fun",
    meta: "humanmadelogic.fun",
  },
  {
    label: "Vithub.in",
    href: "https://vithub.in",
    meta: "vithub.in",
  },
];
