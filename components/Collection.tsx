"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import PaytmModal from "./PaytmModal";
import { OFFERS, type Offer } from "@/lib/catalog";
import { whatsappLink } from "@/lib/site";
import { fmtINR } from "@/lib/format";
import { addToCart } from "@/lib/cart";

function trackAddToCart(value: number) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "AddToCart", { value, currency: "INR" });
  }
}

function trackInitiateCheckout(value: number) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "InitiateCheckout", { value, currency: "INR" });
  }
}

function whatsappOrderLink(offer: Offer) {
  return whatsappLink(
    `Hi Softglow! I'd like to order ${offer.name} for ${fmtINR.format(offer.price)}. My name and delivery address: `
  );
}

interface CollectionProps {
  products: Record<string, { variantId: string; available: boolean }>;
}

export default function Collection({ products }: CollectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [paytmOpen, setPaytmOpen] = useState(false);
  const [paytmValue, setPaytmValue] = useState(799);
  const [adding, setAdding] = useState<string | null>(null);
  const [added, setAdded] = useState<string | null>(null);

  const openPaytm = (value: number) => {
    trackInitiateCheckout(value);
    setPaytmValue(value);
    setPaytmOpen(true);
  };

  const handleShopifyBuy = async (offer: Offer) => {
    const product = products[offer.handle];
    if (!product?.variantId) {
      openPaytm(offer.price);
      return;
    }

    trackAddToCart(offer.price);
    setAdding(offer.id);
    const cart = await addToCart(product.variantId, 1);
    setAdding(null);

    if (cart) {
      setAdded(offer.id);
      window.setTimeout(() => setAdded(null), 3000);
      return;
    }

    openPaytm(offer.price);
  };

  return (
    <section
      id="collection"
      ref={ref}
      className="relative bg-[#0B1020] py-24 md:py-32"
      aria-label="Choose your Softglow"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-[#FFB86B] text-xs font-semibold tracking-[0.3em] mb-3">
            CHOOSE YOUR GLOW
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-5">
            Pick Your Bundle
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FFB86B]/35 bg-[#FFB86B]/10 px-3.5 py-1.5 text-[13px] font-semibold text-[#FFE3C2]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB86B]" aria-hidden="true" />
              Free shipping across India
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[13px] font-semibold text-[#E3E8F7]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7FE5C8]" aria-hidden="true" />
              Cash on Delivery available
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {OFFERS.map((offer, i) => {
            const product = products[offer.handle];
            const shopifyReady = Boolean(product?.variantId);
            const isBestValue = Boolean(offer.badge);

            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`group relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  isBestValue
                    ? "bg-gradient-to-b from-[#1A2244] via-[#121933] to-[#121933] border border-[#FFB86B]/60 ring-1 ring-inset ring-[#FFB86B]/15 shadow-[0_24px_80px_rgba(255,184,107,0.16)] hover:shadow-[0_28px_90px_rgba(255,184,107,0.22)]"
                    : "bg-[#121933] border border-[#1A2244] hover:border-[#FFB86B]/30"
                }`}
              >
                {isBestValue && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFB86B] to-transparent" />
                )}
                {offer.badge && (
                  <div className="absolute top-6 right-6 z-10 bg-[#FFB86B] text-[#0B1020] text-[11px] font-bold px-3 py-1 rounded-full tracking-wider shadow-[0_4px_16px_rgba(255,184,107,0.35)]">
                    {offer.badge}
                  </div>
                )}

                <div className={isBestValue ? "p-4 pb-0" : "p-3 pb-0"}>
                  <div className="relative h-[300px] rounded-2xl overflow-hidden bg-[#1A2244]">
                    <Image
                      src={offer.image}
                      alt={offer.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121933]/70 via-transparent to-transparent" />
                  </div>
                </div>

                <div
                  className={`flex flex-col flex-1 text-center ${
                    isBestValue ? "p-7 pt-6" : "p-6 pt-5"
                  }`}
                >
                  <p className="text-[#FFB86B] text-[11px] font-semibold tracking-[0.18em] mb-2">
                    {offer.specs}
                  </p>
                  <h3 className="font-heading text-2xl font-semibold text-white mb-1.5">
                    {offer.name}
                  </h3>
                  <p className="text-[#C3CBE6] text-sm mb-5">{offer.quote}</p>

                  <div className="flex items-center justify-center gap-3 mb-6">
                    <span className="font-heading text-3xl font-semibold text-white">
                      {fmtINR.format(offer.price)}
                    </span>
                    <span className="text-[#8B94B8] text-base line-through">
                      {fmtINR.format(offer.compareAt)}
                    </span>
                    <span className="bg-[#FFB86B]/15 text-[#FFB86B] text-xs font-bold px-2.5 py-1 rounded-full">
                      {offer.savePct}
                    </span>
                  </div>

                  <div className="mt-auto space-y-3">
                    <button
                      onClick={
                        shopifyReady
                          ? () => handleShopifyBuy(offer)
                          : () => openPaytm(offer.price)
                      }
                      disabled={adding === offer.id}
                      className="w-full bg-[#FFB86B] text-[#0B1020] font-bold text-sm py-4 rounded-xl hover:bg-[#ffa94d] transition-all duration-200 hover:shadow-[0_0_24px_rgba(255,184,107,0.35)] active:scale-[0.98] disabled:opacity-70"
                    >
                      {adding === offer.id
                        ? "ADDING…"
                        : added === offer.id
                          ? "ADDED TO CART ✓"
                          : shopifyReady
                            ? `ADD TO CART — ${fmtINR.format(offer.price)}`
                            : `PAY VIA UPI — ${fmtINR.format(offer.price)}`}
                    </button>
                    {added === offer.id && (
                      <Link
                        href="/cart"
                        className="block text-[#FFB86B] text-xs font-semibold tracking-wide hover:underline underline-offset-4"
                      >
                        View cart →
                      </Link>
                    )}

                    <div className="flex gap-2">
                      {shopifyReady ? (
                        <>
                          <button
                            onClick={() => openPaytm(offer.price)}
                            className="flex-1 border border-[#2A3563] hover:border-[#FFB86B]/50 text-[#E3E8F7] hover:text-white text-[11px] font-semibold py-2.5 rounded-xl transition-all duration-200"
                          >
                            PAY VIA UPI
                          </button>
                          <div className="flex-1 border border-[#2A3563] text-[#E3E8F7] text-[11px] font-semibold py-2.5 rounded-xl flex items-center justify-center">
                            COD AVAILABLE
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex-1 border border-[#2A3563] text-[#E3E8F7] text-[11px] font-semibold py-2.5 rounded-xl flex items-center justify-center">
                            COD AVAILABLE
                          </div>
                          <div className="flex-1 border border-[#2A3563] text-[#E3E8F7] text-[11px] font-semibold py-2.5 rounded-xl flex items-center justify-center">
                            7-DAY REPLACEMENT
                          </div>
                        </>
                      )}
                    </div>

                    <a
                      href={whatsappOrderLink(offer)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackInitiateCheckout(offer.price)}
                      className="inline-flex items-center justify-center w-full pt-1 text-[11px] font-medium text-[#A8B2D1] hover:text-[#7FE5C8] transition-colors duration-200"
                    >
                      Prefer WhatsApp? Order there →
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-[#8B94B8] text-xs mt-10 tracking-wide">
          Dispatched in 1–2 business days · 7-day replacement · Safe BPA-free silicone
        </p>
      </div>

      <PaytmModal
        isOpen={paytmOpen}
        amount={paytmValue}
        onClose={() => setPaytmOpen(false)}
      />
    </section>
  );
}
