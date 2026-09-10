export type TimelineEntry = {
  year: string;
  events: {
    title: string;
    detail: string;
  }[];
};

export const timeline: TimelineEntry[] = [
  {
    year: "2025",
    events: [
      {
        title: "Shipped the streaming query console at Northbeam",
        detail:
          "Rewrote the result pipeline around incremental rendering; median time-to-first-row fell from 4.1s to 380ms.",
      },
      {
        title: "Spoke at a regional frontend meetup",
        detail:
          "Forty minutes on why most virtualised tables are slower than the naive version, with measurements.",
      },
    ],
  },
  {
    year: "2024",
    events: [
      {
        title: "Meridian design system reached three products",
        detail:
          "Forty-two components on a shared token pipeline, adopted without a single migration freeze.",
      },
      {
        title: "Published twelve engineering essays",
        detail:
          "Notes on rendering, state, and the parts of accessibility that are actually load-bearing.",
      },
    ],
  },
  {
    year: "2022",
    events: [
      {
        title: "Open-sourced a CRDT text-sync library",
        detail:
          "Extracted from Quill; now used by a handful of small editors and one very patient wiki.",
      },
    ],
  },
  {
    year: "2019",
    events: [
      {
        title: "Moved from agency work into product engineering",
        detail:
          "Traded a wide surface of client sites for a narrow one I could actually maintain.",
      },
      {
        title: "Built my first component library",
        detail:
          "Badly, and then a second time properly. The second one is still in production.",
      },
    ],
  },
];
