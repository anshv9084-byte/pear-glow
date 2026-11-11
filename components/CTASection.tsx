"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WORDS = ["SLEEP", "SOFTER.", "STARTING", "TONIGHT."];

function trackInitiateCheckout() {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "InitiateCheckout", { value: 799, currency: "INR" });
  }
}

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="cta"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B1020]"
      aria-label="Call to action"
    >
      {/* Amber radial gradient from bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom, rgba(255,184,107,0.18) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Animated glow orb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none lamp-glow opacity-20"
        style={{ background: "radial-gradient(circle, #FFB86B 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        {/* Word-by-word headline */}
        <h2
          className="font-heading font-semibold text-white leading-[1.05] mb-6"
          style={{ fontSize: "clamp(52px, 9vw, 120px)" }}
          aria-label="SLEEP SOFTER. STARTING TONIGHT."
        >
          {WORDS.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
              className={`inline-block mr-[0.2em] ${
                word === "SOFTER." || word === "TONIGHT." ? "text-[#FFB86B]" : "text-white"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-[#C3CBE6] text-lg mb-12"
        >
          One tap. One color. One calm room.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#collection"
            onClick={trackInitiateCheckout}
            className="bg-[#FFB86B] text-[#0B1020] font-bold text-base px-10 py-4 rounded-full min-w-[300px] text-center hover:bg-[#ffa94d] hover:shadow-[0_0_40px_rgba(255,184,107,0.5)] transition-all duration-200 active:scale-95"
          >
            GET YOUR SOFTGLOW
          </a>
          <a
            href="#lamp"
            className="border border-white/20 text-white font-medium text-base px-10 py-4 rounded-full min-w-[300px] text-center hover:border-white/40 hover:bg-white/5 transition-all duration-200"
          >
            KEEP THE DARK.
          </a>
        </motion.div>

        {/* Shipping reassurance */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
          className="mt-8 text-[#8B94B8] text-xs tracking-widest"
        >
          FREE SHIPPING · DISPATCHED IN 1-2 DAYS · 7-DAY REPLACEMENT
        </motion.p>
      </div>
    </section>
  );
}
