"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const OLD_WAY = [
  "Harsh on sleeping eyes",
  "Glass body — shatters if dropped",
  "Stuck near the plug socket",
  "Single fixed color",
  "Hard plastic — not child-safe",
];

const NEW_WAY = [
  "Soft, calming glow — 7 colors",
  "Squishable silicone — won't shatter",
  "USB rechargeable — goes anywhere",
  "Touch control on the body",
  "BPA-free, non-toxic material",
];

export default function Truth() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="compare"
      ref={ref}
      className="bg-[#121933] py-24 md:py-32"
      aria-label="The Night Problem"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-[#FFB86B] text-xs font-semibold tracking-[0.3em] mb-6">
            THE NIGHT PROBLEM
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="font-heading font-semibold text-white leading-[0.95] mb-8"
            style={{ fontSize: "clamp(48px, 6vw, 88px)" }}
          >
            NO MORE
            <br />
            <span className="text-[#FFB86B]">FUMBLING</span>
            <br />
            FOR THE
            <br />
            SWITCH.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[#C3CBE6] text-base leading-relaxed max-w-md"
          >
            Scary dark rooms. Harsh bright lights. Lamps that shatter when knocked over.
            There&apos;s a better way to light the night — one that&apos;s soft, safe, and
            completely in your child&apos;s control.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="space-y-4"
        >
          <div className="bg-[#1A2244]/60 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4 gap-3">
              <p className="font-heading text-lg font-semibold text-[#C3CBE6]">
                THE OLD NIGHT LIGHT
              </p>
              <span className="bg-white/10 text-[#C3CBE6] text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                THE OLD WAY
              </span>
            </div>
            <ul className="space-y-3">
              {OLD_WAY.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[#8B94B8] text-sm">
                  <span className="text-[#FF7EB6]/80 font-bold" aria-hidden="true">
                    ✗
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#1A2244] border border-[#FFB86B]/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFB86B] to-transparent" />
            <div className="flex items-center justify-between mb-4 gap-3">
              <p className="font-heading text-lg font-semibold text-white">SOFTGLOW</p>
              <span className="bg-[#FFB86B] text-[#0B1020] text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                THE BETTER WAY
              </span>
            </div>
            <ul className="space-y-3">
              {NEW_WAY.map((item) => (
                <li key={item} className="flex items-center gap-3 text-white text-sm">
                  <span className="text-[#7FE5C8] font-bold" aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-center text-[#C3CBE6] text-sm font-medium pt-2">
            WHICH ONE DO YOU WANT BY THE BED?
          </p>
        </motion.div>
      </div>
    </section>
  );
}
