"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const GLOWS = [
  { name: "AMBER", filter: "hue-rotate(0deg)", dot: "bg-[#FFB86B]" },
  { name: "ROSE", filter: "hue-rotate(305deg) saturate(1.05)", dot: "bg-[#FF7EB6]" },
  { name: "MINT", filter: "hue-rotate(115deg)", dot: "bg-[#7FE5C8]" },
];

function trackAddToCart() {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "AddToCart", { value: 799, currency: "INR" });
  }
}

export default function Hero() {
  const [glow, setGlow] = useState(0);

  return (
    <section
      id="lamp"
      className="relative min-h-screen w-full overflow-hidden flex items-center bg-[#0B1020] pt-28 pb-16 md:pt-24"
      aria-label="Hero section"
    >
      {/* Ambient background glow */}
      <div
        className="absolute -top-40 right-0 w-[720px] h-[720px] rounded-full opacity-25 blur-3xl pointer-events-none lamp-glow"
        style={{ background: "radial-gradient(circle, #FFB86B 0%, transparent 65%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom, rgba(255,184,107,0.10) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 border border-[#FFB86B]/30 bg-[#FFB86B]/10 rounded-full px-4 py-1.5 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB86B] lamp-glow" aria-hidden="true" />
            <span className="text-[#FFB86B] text-[11px] font-semibold tracking-[0.18em]">
              COLOR-CHANGING NIGHT LAMP
            </span>
          </div>

          <h1
            className="font-heading font-semibold leading-[1.02] mb-6 text-white"
            style={{ fontSize: "clamp(40px, 5.5vw, 76px)" }}
          >
            A GENTLE GLOW
            <br />
            <span className="text-[#FFB86B]">FOR EVERY NIGHT.</span>
          </h1>

          <p className="text-[#C3CBE6] text-lg md:text-xl mb-9 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Soft silicone. 7 calming colors. One tap.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#collection"
              onClick={trackAddToCart}
              className="inline-flex items-center justify-center bg-[#FFB86B] text-[#0B1020] font-bold text-base px-8 py-4 rounded-full hover:bg-[#ffa94d] hover:shadow-[0_0_30px_rgba(255,184,107,0.5)] transition-all duration-200 active:scale-95"
            >
              GET YOURS FROM ₹799
            </a>
            <a
              href="#why"
              className="inline-flex items-center justify-center border border-white/20 text-white font-medium text-base px-8 py-4 rounded-full hover:border-[#FFB86B]/50 hover:text-[#FFB86B] transition-all duration-200"
            >
              WHY SOFTGLOW?
            </a>
          </div>

          <p className="mt-7 text-[#C3CBE6] text-[11px] tracking-[0.18em]">
            FREE SHIPPING ACROSS INDIA · COD AVAILABLE · 7-DAY REPLACEMENT
          </p>
        </div>

        {/* Product visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md lg:max-w-lg"
        >
          <div
            className="absolute inset-10 rounded-full blur-3xl opacity-40 lamp-glow pointer-events-none"
            style={{ background: "radial-gradient(circle, #FFB86B 0%, transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#1A2244] to-[#121933] p-5 md:p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <div className="relative aspect-square rounded-[1.4rem] overflow-hidden bg-[#0B1020]">
              <Image
                src="/assets/product/lamp-duo.jpg"
                alt="Softglow pear-shaped silicone lamps glowing amber and pink"
                fill
                priority
                className="object-cover transition-[filter] duration-700"
                style={{ filter: GLOWS[glow].filter }}
                sizes="(max-width: 1024px) 90vw, 480px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/50 via-transparent to-transparent pointer-events-none" />

              <span className="absolute top-4 left-4 bg-[#0B1020]/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-semibold tracking-[0.14em] px-3 py-1.5 rounded-full">
                7 COLORS
              </span>
              <span className="absolute bottom-4 right-4 bg-[#0B1020]/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-semibold tracking-[0.14em] px-3 py-1.5 rounded-full">
                USB RECHARGEABLE
              </span>
            </div>

            {/* Color picker */}
            <div className="mt-5 flex items-center justify-center gap-2">
              {GLOWS.map((g, i) => (
                <button
                  key={g.name}
                  onClick={() => setGlow(i)}
                  aria-label={`Show lamp in ${g.name.toLowerCase()}`}
                  aria-pressed={glow === i}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-semibold tracking-wider transition-all duration-200 ${
                    glow === i
                      ? "border-[#FFB86B]/60 bg-[#FFB86B]/10 text-white"
                      : "border-[#2A3563] text-[#8B94B8] hover:text-white hover:border-[#FFB86B]/30"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${g.dot}`} aria-hidden="true" />
                  {g.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-60">
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#FFB86B] to-transparent animate-pulse" />
        <span className="text-[#C3CBE6] text-[10px] tracking-[0.2em]">SCROLL</span>
      </div>
    </section>
  );
}
