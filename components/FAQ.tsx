"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const FAQS = [
  {
    q: "IS IT SAFE FOR KIDS?",
    a: "The body is made from BPA-free, non-toxic silicone and plastic, with no glass to shatter. It's soft and squishable so there's no risk of cuts.",
  },
  {
    q: "HOW DO I CHANGE THE COLOR?",
    a: "Tap the body or base. There are 7 color-changing LED modes — just keep tapping to cycle through them.",
  },
  {
    q: "HOW IS IT CHARGED?",
    a: "It has a USB rechargeable battery, so there is no need to stay plugged in. Use any standard USB charger.",
  },
  {
    q: "HOW BIG IS IT?",
    a: "7.5 cm deep, 8.5 cm wide and 12 cm tall, and it weighs about 100 g — small enough to pack in a bag.",
  },
  {
    q: "CAN I GIFT IT?",
    a: "Yes. It makes an easy, thoughtful gift for new parents and kids' rooms. We dispatch in 1-2 business days.",
  },
  {
    q: "WHAT IF IT ARRIVES DAMAGED?",
    a: "Message us within 7 days with a photo and we'll arrange a replacement. No questions asked.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="faq"
      ref={ref}
      className="bg-[#0B1020] py-24 md:py-32"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="text-center mb-14">
          <p className="text-[#FFB86B] text-xs font-semibold tracking-[0.3em] mb-3">
            GOT QUESTIONS?
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white">
            QUESTIONS PARENTS ASK
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-[#121933] border border-[#1A2244] rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#1A2244]/50 transition-colors duration-200"
              >
                <span className="font-heading text-base font-semibold text-white tracking-wide">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0 text-[#FFB86B] text-2xl font-light"
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-[#C3CBE6] text-sm leading-relaxed border-t border-[#1A2244] pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
