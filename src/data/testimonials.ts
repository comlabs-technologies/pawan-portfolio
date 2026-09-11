export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  avatar: string;
};

/** Fictional people at fictional companies. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Pawan rewrote a rendering path we had written off as impossible. The dashboard went from unusable to boring, which is the highest praise I have.",
    name: "Nadia Oyelaran",
    title: "VP Engineering, Northbeam Systems",
    avatar: "/images/people/nadia-oyelaran.png",
  },
  {
    quote:
      "He asks the question everyone else is avoiding, then quietly ships the answer two days later. Our checkout numbers still reflect that quarter.",
    name: "Ivan Brekke",
    title: "Head of Product, Lumen Retail",
    avatar: "/images/people/ivan-brekke.png",
  },
  {
    quote:
      "The design system he built is the reason our team of six can ship like a team of twenty. Every token has a reason behind it.",
    name: "Mira Halloran",
    title: "Design Director, Orbit Foundry",
    avatar: "/images/people/mira-halloran.png",
  },
  {
    quote:
      "I have reviewed a lot of pull requests. His read like documentation. Onboarding new engineers got noticeably faster.",
    name: "Tomas Lindqvist",
    title: "Principal Engineer, Cassette Labs",
    avatar: "/images/people/tomas-lindqvist.png",
  },
  {
    quote:
      "We hired him for a three-week fix and kept him for a year. He left behind tests, notes, and a team that understood the system.",
    name: "Ayesha Rahman",
    title: "Founder, Foldwork Studio",
    avatar: "/images/people/ayesha-rahman.png",
  },
];
