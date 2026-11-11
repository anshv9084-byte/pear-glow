"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const LINES = [
  "Dark rooms feel big at 2 a.m.",
  "Glass lamps break. This one squishes.",
  "Tap once. Pick a color. Sleep.",
];

const LIFESTYLE_IMAGES = [
  {
    src: "/assets/product/lamp-single.jpg",
    alt: "Softglow pear lamp glowing amber",
    filter: "hue-rotate(0deg)",
    label: "AMBER",
  },
  {
    src: "/assets/product/lamp-single.jpg",
    alt: "Softglow pear lamp glowing rose pink",
    filter: "hue-rotate(305deg) saturate(1.05)",
    label: "ROSE",
  },
  {
    src: "/assets/product/lamp-duo.jpg",
    alt: "Two Softglow pear lamps glowing in different colors",
    filter: "hue-rotate(115deg)",
    label: "DUO",
  },
];

export default function SwipeManifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="why"
      ref={ref}
      className="bg-[#0B1020] py-24 md:py-32"
      aria-label="Why Softglow"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-[#FFB86B] text-xs font-semibold tracking-[0.3em] mb-6">
            WHY SOFTGLOW
          </p>
          <div className="space-y-6 mb-10">
            {LINES.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
                className="font-heading text-3xl md:text-4xl font-semibold text-white leading-tight"
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-[#C3CBE6] text-base leading-relaxed max-w-md"
          >
            Dark rooms feel big at 2 a.m. Glass lamps break. Plug-in lights stay where
            they&apos;re plugged. Softglow is a soft, squishable, rechargeable lamp that goes
            wherever the night does.
          </motion.p>

          <motion.a
            href="#collection"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 }}
            className="inline-block mt-8 text-[#FFB86B] text-sm font-semibold tracking-wider hover:underline underline-offset-4"
          >
            SHOP THE LAMP →
          </motion.a>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            ref={carouselRef}
            drag="x"
            dragConstraints={{ left: -200, right: 0 }}
            dragElastic={0.1}
            className="flex gap-4 cursor-grab active:cursor-grabbing"
          >
            {LIFESTYLE_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative flex-shrink-0 w-64 h-80 rounded-2xl overflow-hidden border border-white/10"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover pointer-events-none transition-[filter] duration-700"
                  style={{ filter: img.filter }}
                  sizes="256px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/70 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-[10px] font-semibold tracking-[0.2em]">
                  {img.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <p className="text-[#8B94B8] text-xs tracking-wider mt-4 text-center">
            DRAG TO EXPLORE →
          </p>
        </div>
      </div>
    </section>
  );
}
