export type TravelCard = {
  id: string;
  location: string;
  caption: string;
  image: string;
  alt: string;
  /** Percentage offsets inside the gallery frame. */
  desktop: { x: number; y: number; rotate: number };
  mobile: { x: number; y: number; rotate: number };
};

/**
 * Places tied to Pawan's own history: where he lives, where he studied, and
 * where the maritime 5G fieldwork took him. The images are original generated
 * illustrations standing in for photographs, not licensed stock and not
 * presented as photographs.
 *
 * To extend this: add an entry, drop a photograph at the `image` path, and give
 * it a resting position and rotation. The gallery lays out whatever it is given.
 */
export const travelCards: TravelCard[] = [
  {
    id: "pune",
    location: "Pune, Maharashtra",
    caption: "Home, and where the work happens",
    image: "/images/travel/pune.png",
    alt: "Illustration of dry Deccan hillsides under a warm hazy sky",
    desktop: { x: 6, y: 8, rotate: -7 },
    mobile: { x: 2, y: 2, rotate: -6 },
  },
  {
    id: "goa-campus",
    location: "Goa",
    caption: "Five years at the BITS Pilani campus",
    image: "/images/travel/goa-campus.png",
    alt: "Illustration of green coastal ridges above a calm blue sea",
    desktop: { x: 35, y: 3, rotate: 5 },
    mobile: { x: 30, y: 14, rotate: 5 },
  },
  {
    id: "mormugao",
    location: "Mormugao Port, Goa",
    caption: "Fieldwork for the maritime 5G research",
    image: "/images/travel/mormugao.png",
    alt: "Illustration of a harbour headland at dusk with water in the foreground",
    desktop: { x: 62, y: 11, rotate: -4 },
    mobile: { x: 11, y: 32, rotate: -4 },
  },
];
