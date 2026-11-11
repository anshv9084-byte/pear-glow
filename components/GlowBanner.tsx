"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function GlowBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="glow-banner"
      ref={ref}
      className="relative bg-[#121933] py-24 md:py-28 overflow-hidden"
      aria-label="Lifestyle banner"
    >
      <div
        className="absolute top-1/2 -right-24 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none lamp-glow"
        style={{ background: "radial-gradient(circle, #FFB86B 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-[#FFB86B] text-xs font-semibold tracking-[0.3em] mb-4 uppercase"
          >
            Because every night needs a little light.
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-heading text-4xl md:text-5xl font-semibold text-white mb-5 leading-tight"
          >
            Get yours today.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
            className="text-[#C3CBE6] text-base leading-relaxed mb-7 max-w-md mx-auto md:mx-0"
          >
            One tap turns any dark room into a calm one. Soft enough to sleep beside,
            bright enough to find your way.
          </motion.p>
          <motion.a
            href="#collection"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center justify-center bg-[#FFB86B] text-[#0B1020] font-bold text-sm px-8 py-3.5 rounded-full hover:bg-[#ffa94d] transition-all duration-200 active:scale-95"
          >
            SHOP THE LAMP →
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-[#1A2244]">
            <Image
              src="/assets/product/lamp-duo.jpg"
              alt="Two Softglow pear-shaped lamps glowing beside each other"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 440px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
              <span className="bg-[#0B1020]/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-semibold tracking-[0.16em] px-3 py-1.5 rounded-full">
                SOFTGLOW DUO
              </span>
              <span className="bg-[#FFB86B] text-[#0B1020] text-[10px] font-bold tracking-[0.12em] px-3 py-1.5 rounded-full">
                ₹1,299
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
