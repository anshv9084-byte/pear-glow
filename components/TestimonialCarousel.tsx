"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Priya M.",
    location: "Mumbai",
    product: "Softglow Single",
    text: "My daughter absolutely loves this lamp! She taps it herself every night to pick her favorite color. Best bedtime buy.",
    stars: 5,
  },
  {
    name: "Rahul K.",
    location: "Bangalore",
    product: "Softglow Duo",
    text: "Bought two — one for the nursery and one for our bedroom. The soft glow is perfect. No more harsh lights at 3 a.m.",
    stars: 5,
  },
  {
    name: "Anjali S.",
    location: "Delhi",
    product: "Softglow Single",
    text: "Gifted this to my sister for her newborn. She said it's the most useful baby gift she received. The silicone feels really premium.",
    stars: 5,
  },
];

const VerifiedBadge = () => (
  <span className="inline-flex items-center gap-1 bg-[#7FE5C8]/10 text-[#7FE5C8] text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full">
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
    Verified Buyer
  </span>
);

export default function TestimonialCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="reviews"
      ref={ref}
      className="bg-[#121933] py-24 md:py-32"
      aria-label="Customer reviews"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-14">
          <p className="text-[#FFB86B] text-xs font-semibold tracking-[0.3em] mb-3">
            REAL ROOMS. REAL GLOW.
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white">
            What Parents Say
          </h2>
          <p className="text-[#E3E8F7] text-sm md:text-base mt-4">
            Verified reviews from Softglow homes across India
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="bg-[#1A2244] border border-white/5 rounded-2xl p-6 relative overflow-hidden hover:border-[#FFB86B]/30 transition-colors duration-300"
            >
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#FFB86B]/40 to-transparent" />

              <div className="flex gap-1 mb-4" aria-label={`${t.stars} out of 5 stars`}>
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} className="text-[#FFB86B] text-sm" aria-hidden="true">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-[#E3E8F7] text-sm leading-relaxed mb-5">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FFB86B]/20 flex items-center justify-center text-[#FFB86B] text-sm font-bold">
                  {t.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <VerifiedBadge />
                  </div>
                  <p className="text-[#A8B2D1] text-xs mt-0.5">
                    {t.location} · {t.product}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
