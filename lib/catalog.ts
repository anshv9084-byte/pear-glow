export const OFFERS = [
  {
    id: "single",
    handle: "color-changing-silicone-night-lamp",
    name: "SOFTGLOW SINGLE",
    specs: "7 COLORS · TOUCH CONTROL · USB RECHARGEABLE",
    quote: "One soft light for the room that needs it most.",
    price: 799,
    compareAt: 1299,
    image: "/assets/product/lamp-single.jpg",
    savePct: "Save 38%",
    badge: null as string | null,
  },
  {
    id: "duo",
    handle: "color-changing-silicone-night-lamp-duo",
    name: "SOFTGLOW DUO",
    specs: "2 LAMPS · BEDSIDE + NURSERY · BEST VALUE",
    quote: "One for every room that gets dark.",
    price: 1299,
    compareAt: 1598,
    image: "/assets/product/lamp-duo.jpg",
    savePct: "Save ₹299",
    badge: "BEST VALUE" as string | null,
  },
];

export type Offer = (typeof OFFERS)[number];
