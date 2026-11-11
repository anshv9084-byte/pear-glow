export const PRODUCT_NAME = "Color-Changing Silicone Night Lamp";

export const RATING = 4.6;
export const REVIEW_COUNT = "1,240";
export const STOCK_LEFT = 14;

export type BundleId = "single" | "duo";

export interface Bundle {
  id: BundleId;
  label: string;
  price: number;
  compareAt: number;
  saveLabel: string;
  saveAmount?: string;
  units: number;
  badge?: string;
  rationale?: string;
}

export const BUNDLES: Record<BundleId, Bundle> = {
  single: {
    id: "single",
    label: "Single",
    price: 799,
    compareAt: 799,
    saveLabel: "",
    units: 1,
    rationale: "One warm glow for the bedside.",
  },
  duo: {
    id: "duo",
    label: "Duo",
    price: 1199,
    compareAt: 1199,
    saveLabel: "",
    units: 2,
    badge: "Best value",
    rationale: "One for the bedroom, one for travel.",
  },
};

export interface PearVariant {
  id: string;
  name: string;
  swatch: string;
  image: string;
}

export const VARIANTS: PearVariant[] = [
  {
    id: "baby-unicorn",
    name: "Baby Unicorn",
    swatch: "#F3B8C8",
    image: "/assets/pear/pink-front.webp",
  },
  {
    id: "mint-bunny",
    name: "Mint Bunny",
    swatch: "#A6E3D6",
    image: "/assets/pear/nursery-mint.webp",
  },
  {
    id: "sunny-bear",
    name: "Sunny Bear",
    swatch: "#F1D98F",
    image: "/assets/pear/glow-podium.webp",
  },
  {
    id: "lavender-lamb",
    name: "Lavender Lamb",
    swatch: "#C5BFEA",
    image: "/assets/pear/gradient-pear.webp",
  },
];

export interface GalleryImage {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
}

export const GALLERY: GalleryImage[] = [
  {
    src: "/assets/pear/pink-room.webp",
    alt: "Pear Glow lamp glowing softly beside a child's playhouse at bedtime",
  },
  {
    src: "/assets/pear/nursery-mint.webp",
    alt: "Pear Glow lamp glowing mint in a dark nursery reading corner",
  },
  {
    src: "/assets/pear/glow-podium.webp",
    alt: "Pear Glow lamp glowing warmly on a green bedside stool",
  },
  {
    src: "/assets/pear/pink-room-alt.webp",
    alt: "Pear Glow lamp as a calm night light in a pink bedroom",
  },
];

export const FEATURES = [
  { icon: "usb", label: "USB\nRECHARGEABLE" },
  { icon: "heart", label: "SQUISHABLE\nBODY" },
  { icon: "star", label: "7 LED COLORS" },
  { icon: "touch", label: "TOUCH\nCONTROL" },
] as const;

export const STEPS = [
  {
    tag: "Wind down",
    title: "Pick a warm glow",
    body: "Tap the squishy body to choose a soft color that signals to your child that bedtime is starting.",
  },
  {
    tag: "30-min timer",
    title: "Start the fade-out",
    body: "One press sets the 30-minute timer. The lamp stays bright enough for stories, then gently dims as your child settles.",
  },
  {
    tag: "Lights out",
    title: "Leave the room calmly",
    body: "The lamp switches itself off — no harsh overhead light, no getting up to turn it off, no bedtime battle.",
  },
];

export const SPECS = [
  ["Dimensions", "7.5D x 8.5W x 12H Centimeters"],
  ["Weight", "100 grams"],
  ["Power Source", "USB rechargeable battery"],
  ["Control Type", "Touch control / tap to switch"],
  ["Auto shut-off", "30-minute fade-out timer"],
  ["Lighting Modes", "7 color-changing LED lights"],
  ["Material", "Silicone and plastic"],
  ["Finish", "Lacquered"],
  ["Color", "White with color-changing LED"],
];

export type ComparisonVisual = "pear" | "plug-in" | "overhead";

export interface ComparisonItem {
  title: string;
  body: string;
  badge: string;
  visual: ComparisonVisual;
  image?: string;
  alt?: string;
}

export const COMPARISON: ComparisonItem[] = [
  {
    title: "Pear Glow fade-out lamp",
    body: "A warm glow your child can hold, with a 30-minute fade-out that ends the night for you.",
    badge: "OUR PICK",
    visual: "pear",
    image: "/assets/pear/pink-room.webp",
    alt: "Pear Glow silicone night lamp glowing softly",
  },
  {
    title: "Standard plug-in night light",
    body: "Stuck in one socket. Usually no 30-minute fade-out, no portability, and no child-friendly tap control.",
    badge: "NO TIMER",
    visual: "plug-in",
  },
  {
    title: "Overhead bedroom light",
    body: "Bright glare from above. Often no dimmer or fade-out, so the room stays stimulating at bedtime.",
    badge: "GLARE",
    visual: "overhead",
  },
];

export const HERO_VIDEO = {
  src: "/assets/pear/videos/hero-demo.mp4",
  poster: "/assets/pear/videos/hero-demo.jpg",
  label: "Real Pear Glow lamp being tapped and cycled through colors",
};

export const VIDEO_REVIEWS = [
  {
    src: "/assets/pear/videos/review-unboxing.mp4",
    poster: "/assets/pear/videos/review-unboxing.jpg",
    title: "Unboxing & first tap",
    caption:
      "Straight out of the box: one tap wakes the glow and changes the color.",
  },
  {
    src: "/assets/pear/videos/review-dark.mp4",
    poster: "/assets/pear/videos/review-dark.jpg",
    title: "The dark-room glow",
    caption:
      "One tap for a soft night light; another tap to cycle the colors.",
  },
  {
    src: "/assets/pear/videos/review-room.mp4",
    poster: "/assets/pear/videos/review-room.jpg",
    title: "From room to room",
    caption: "A portable glow that moves with your bedtime routine.",
  },
];

export const REVIEWS = [
  {
    name: "Priya S.",
    text: "My daughter absolutely loves this little lamp. The tap control is super easy for her to use by herself at night.",
    stars: 5,
  },
  {
    name: "Amit K.",
    text: "Super cute and squishy. It gives off just the right amount of soft light for the nursery without being blinding.",
    stars: 5,
  },
  {
    name: "Neha M.",
    text: "Very adorable design and handy size. My kids fight over who gets to change the colors at bedtime.",
    stars: 5,
  },
  {
    name: "Rahul V.",
    text: "Great little lamp for the price. The color-changing feature works smoothly and it looks great on the nightstand.",
    stars: 5,
  },
  {
    name: "Sneha R.",
    text: "Bought this as a gift for my niece and she takes it everywhere with her. Very happy with the quality.",
    stars: 4,
  },
  {
    name: "Karan D.",
    text: "Nice gentle glow. Battery life is decent if you charge it regularly, and the silicone body feels very safe for kids.",
    stars: 5,
  },
];

export const HAPPY_FAMILIES = [
  {
    src: "/assets/pear/pink-room.webp",
    alt: "Pear Glow lamp glowing beside a child's playhouse at bedtime",
  },
  {
    src: "/assets/pear/nursery-mint.webp",
    alt: "Mint Pear Glow lamp in a dark nursery reading corner",
  },
  {
    src: "/assets/pear/glow-podium.webp",
    alt: "Pear Glow lamp glowing warmly on a bedside stool",
  },
  {
    src: "/assets/pear/pink-room-alt.webp",
    alt: "Pear Glow lamp as a calm night light in a pink bedroom",
  },
];

export const FAQS = [
  {
    q: "How does the 30-minute fade-out work?",
    a: "Tap the timer control once and the lamp begins a gentle 30-minute fade-out. It dims gradually as your child settles, then switches off on its own — no need to go back into the room.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders are dispatched within 1–2 business days and delivered in 4–8 business days across India. Shipping is free, and tracking is sent by SMS, email or WhatsApp.",
  },
  {
    q: "What if my lamp arrives damaged?",
    a: "Message us on WhatsApp within 7 days with a photo and your order details. Once approved, we arrange a replacement within 24 hours.",
  },
  {
    q: "Who do I contact for support in India?",
    a: "Our support team is based in India. WhatsApp us at +91 95546 69084, Monday to Saturday, 10 AM to 7 PM IST, or email hello@pearglow.in. We reply within 24 hours.",
  },
  {
    q: "How do I charge the lamp?",
    a: "Plug the included USB cable into any standard port to charge the internal battery. A full charge gives up to 8–10 hours of gentle glow.",
  },
  {
    q: "How do I clean the silicone body?",
    a: "Wipe the silicone with a soft, slightly damp cloth. Avoid harsh cleaners or submerging the base in water.",
  },
  {
    q: "Is it safe for babies and toddlers?",
    a: "Yes. The body is made from BPA-free, non-toxic silicone with no glass and no hot bulbs, so it stays safe for little hands.",
  },
  {
    q: "How many colors does it have?",
    a: "Seven. Tap the body to cycle through warm amber, rose, mint, sky blue, lavender, and more.",
  },
];

export const MINI_FAQS = FAQS.slice(0, 2);

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function fmtPrice(value: number) {
  return inr.format(value);
}
