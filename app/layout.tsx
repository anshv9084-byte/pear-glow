import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";
import { SITE_URL } from "@/lib/site";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Pear Glow — Color-Changing Silicone Night Lamp",
  description:
    "Give your child a comforting, squishy bedtime friend that glows softly without any shattered glass risk. 7 soothing colors, USB rechargeable, free shipping across India.",
  keywords: [
    "pear glow",
    "silicone night lamp",
    "color changing lamp",
    "nursery light",
    "kids night light",
    "squishy lamp",
    "pear lamp",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pear Glow — Color-Changing Silicone Night Lamp",
    description:
      "A squishy, color-changing bedtime friend that glows softly without any shattered glass risk. Free shipping across India.",
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: "/assets/pear/og.jpg",
        width: 1200,
        height: 630,
        alt: "Pear Glow silicone night lamp glowing in blush pink",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pear Glow — Color-Changing Silicone Night Lamp",
    description:
      "A squishy, color-changing bedtime friend that glows softly without any shattered glass risk.",
    images: ["/assets/pear/og.jpg"],
  },
  other: {
    "facebook-domain-verification": "om7bwo3hyklo0kbl2wyqiyo9t1uv4u",
  },
};

export const viewport = {
  themeColor: "#F8F4EC",
  colorScheme: "light" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${dmSans.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
