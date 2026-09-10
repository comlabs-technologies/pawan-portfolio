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

/** Original generated artwork, not licensed photography. */
export const travelCards: TravelCard[] = [
  {
    id: "kyoto",
    location: "Kyoto, Japan",
    caption: "Hills above Arashiyama, last light",
    image: "/images/travel/kyoto.png",
    alt: "Layered violet hills under a warm dusk sky",
    desktop: { x: 4, y: 6, rotate: -7 },
    mobile: { x: 2, y: 2, rotate: -6 },
  },
  {
    id: "lofoten",
    location: "Lofoten, Norway",
    caption: "Cold water, colder wind",
    image: "/images/travel/lofoten.png",
    alt: "Blue-grey peaks rising from still northern water",
    desktop: { x: 26, y: 2, rotate: 5 },
    mobile: { x: 30, y: 0, rotate: 5 },
  },
  {
    id: "lisbon",
    location: "Lisbon, Portugal",
    caption: "The long walk back up the hill",
    image: "/images/travel/lisbon.png",
    alt: "Warm terracotta ridges beneath a golden evening sky",
    desktop: { x: 50, y: 9, rotate: -4 },
    mobile: { x: 5, y: 18, rotate: -3 },
  },
  {
    id: "reykjavik",
    location: "Reykjavík, Iceland",
    caption: "Green light at two in the morning",
    image: "/images/travel/reykjavik.png",
    alt: "Dark ridges under a faint green aurora",
    desktop: { x: 68, y: 3, rotate: 9 },
    mobile: { x: 33, y: 20, rotate: 8 },
  },
  {
    id: "jaipur",
    location: "Jaipur, India",
    caption: "Rooftops, and far too much tea",
    image: "/images/travel/jaipur.png",
    alt: "Rust-coloured rooflines against an amber sunset",
    desktop: { x: 14, y: 34, rotate: 6 },
    mobile: { x: 2, y: 36, rotate: 6 },
  },
  {
    id: "hakone",
    location: "Hakone, Japan",
    caption: "Fog that never quite cleared",
    image: "/images/travel/hakone.png",
    alt: "Muted green ridges fading into low cloud",
    desktop: { x: 40, y: 38, rotate: -8 },
    mobile: { x: 30, y: 38, rotate: -7 },
  },
  {
    id: "dolomites",
    location: "Dolomites, Italy",
    caption: "Six hours up, forty minutes down",
    image: "/images/travel/dolomites.png",
    alt: "Pale rock spires catching the last of the sun",
    desktop: { x: 64, y: 40, rotate: 3 },
    mobile: { x: 16, y: 42, rotate: 4 },
  },
];
