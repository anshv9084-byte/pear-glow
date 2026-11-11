"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { addToPearCart, openCartDrawer } from "@/lib/pear-cart";
import {
  BUNDLES,
  GALLERY,
  HERO_VIDEO,
  MINI_FAQS,
  PRODUCT_NAME,
  RATING,
  REVIEW_COUNT,
  STOCK_LEFT,
  VARIANTS,
  fmtPrice,
  type BundleId,
} from "@/lib/pear-catalog";
import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/site";
import {
  CheckIcon,
  ChevronDown,
  CloseIcon,
  HERO_PAYMENTS,
  PaymentMarks,
  Stars,
} from "./Common";
import { useUrgencyOffer } from "./useUrgencyOffer";

export default function ProductHero() {
  const [bundleId, setBundleId] = useState<BundleId>("single");
  const [variants, setVariants] = useState<string[]>([
    VARIANTS[0].id,
    VARIANTS[1].id,
  ]);
  const [activeImage, setActiveImage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [autoCycle, setAutoCycle] = useState(true);
  const [mediaMode, setMediaMode] = useState<"video" | "photo">("video");
  const [heroPaused, setHeroPaused] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const {
    active: offerActive,
    percent: offerPercent,
    discountPrice,
  } = useUrgencyOffer();

  useEffect(() => {
    if (!zoomed && !demoOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setZoomed(false);
        setDemoOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [demoOpen, zoomed]);

  useEffect(() => {
    if (mediaMode !== "photo" || !autoCycle || zoomed) return;
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % GALLERY.length);
    }, 2600);
    return () => window.clearInterval(interval);
  }, [autoCycle, mediaMode, zoomed]);

  const bundle = BUNDLES[bundleId];
  const effectivePrice = discountPrice(bundle.price);

  function setVariant(index: number, id: string) {
    setVariants((current) =>
      current.map((entry, i) => (i === index ? id : entry))
    );
  }

  function handleAddToCart() {
    const chosen = Array.from({ length: bundle.units }).map((_, index) => {
      return (
        VARIANTS.find((variant) => variant.id === variants[index]) ?? VARIANTS[0]
      );
    });

    addToPearCart({
      key: `${bundle.id}|${chosen.map((variant) => variant.id).join("+")}`,
      bundle: bundle.id,
      name: PRODUCT_NAME,
      detail: chosen.map((variant) => variant.name).join(" + "),
      price: effectivePrice,
      image: chosen[0].image,
    });
    openCartDrawer();
  }

  function toggleHeroVideo() {
    const video = heroVideoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }

  return (
    <section id="buy" className="scroll-mt-24 pb-14 pt-6 lg:pb-20 lg:pt-9">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-11 lg:px-8 xl:gap-16">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#E9E9EA]">
            {mediaMode === "video" ? (
              <video
                ref={heroVideoRef}
                src={HERO_VIDEO.src}
                poster={HERO_VIDEO.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={HERO_VIDEO.label}
                onPlay={() => setHeroPaused(false)}
                onPause={() => setHeroPaused(true)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setAutoCycle(false);
                    setActiveImage(
                      (current) => (current + 1) % GALLERY.length
                    );
                  }}
                  aria-label="Tap to see the next glow color"
                  className="absolute inset-0 z-10"
                />
                {GALLERY.map((image, index) => (
                  <Image
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    className={`object-cover transition-opacity duration-300 ${
                      activeImage === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </>
            )}
            <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-[#EFE8D8]/90 px-3 py-1.5 text-[10px] font-medium text-[#5D5323] backdrop-blur-sm">
              Best seller
            </span>
            {mediaMode === "video" ? (
              <>
                <span className="pointer-events-none absolute bottom-3 left-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-[#20241B]/60 px-2.5 py-1.5 text-[9.5px] font-semibold text-[#F8F4EC] backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F0E8C9]" />
                  Real lamp demo
                </span>
                <div className="absolute bottom-3 right-3 z-20 flex gap-2">
                  <button
                    type="button"
                    onClick={toggleHeroVideo}
                    className="rounded-full bg-[#F8F4EC]/90 px-3 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.08em] text-[#3D4034] backdrop-blur-sm transition-colors hover:bg-white"
                  >
                    {heroPaused ? "Play" : "Pause"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMediaMode("photo");
                      setAutoCycle(true);
                    }}
                    className="rounded-full bg-[#F8F4EC]/90 px-3 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.08em] text-[#3D4034] backdrop-blur-sm transition-colors hover:bg-white"
                  >
                    Photos
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="pointer-events-none absolute bottom-3 left-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-[#20241B]/60 px-2.5 py-1.5 text-[9.5px] font-semibold text-[#F8F4EC] backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F0E8C9]" />
                  {autoCycle ? "Colors cycling" : "Tap to change the glow"}
                </span>
                <div className="absolute bottom-3 right-3 z-20 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMediaMode("video");
                      setAutoCycle(false);
                    }}
                    className="rounded-full bg-[#F8F4EC]/90 px-3 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.08em] text-[#3D4034] backdrop-blur-sm transition-colors hover:bg-white"
                  >
                    Demo
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setAutoCycle(false);
                      setZoomed(true);
                    }}
                    aria-label="Open image larger"
                    className="rounded-full bg-[#F8F4EC]/90 px-3 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.08em] text-[#3D4034] backdrop-blur-sm transition-colors hover:bg-white"
                  >
                    Zoom
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="mt-2.5 grid grid-cols-4 gap-2 sm:mt-3 sm:gap-3">
            {GALLERY.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => {
                  setAutoCycle(false);
                  setMediaMode("photo");
                  setActiveImage(index);
                }}
                aria-label={`Show image ${index + 1}`}
                aria-pressed={mediaMode === "photo" && activeImage === index}
                className={`relative aspect-square overflow-hidden rounded-lg border bg-[#EFE8D8] transition-all ${
                  activeImage === index
                    ? "border-[#8A7A2E] ring-1 ring-[#8A7A2E]"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="110px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Stars value={RATING} size={14} />
            <span className="text-[12px] font-medium text-[#5C5B4D]">
              Rated {RATING} by {REVIEW_COUNT} happy parents
            </span>
          </div>

          <h1 className="mt-2.5 max-w-[560px] text-[29px] font-semibold leading-[1.06] tracking-[-0.035em] text-[#23271C] sm:text-[36px] lg:text-[38px]">
            The 30-minute fade-out lamp that ends bedtime battles{" "}
            <span className="font-accent italic text-[#8A7A2E]">
              without harsh overhead glare.
            </span>
          </h1>

          <p className="mt-3 max-w-[500px] text-[13.5px] leading-[1.7] text-[#66675A]">
            A squishy, tap-to-glow bedtime friend that dims itself over 30
            minutes — so your toddler drifts off without you lying awake in the
            dark.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <span className="text-[22px] font-semibold tracking-[-0.02em] text-[#23271C]">
              {fmtPrice(effectivePrice)}
            </span>
            {offerActive ? (
              <>
                <span className="text-[13px] text-[#9A9789] line-through">
                  {fmtPrice(bundle.price)}
                </span>
                <span className="rounded-full bg-[#EBE4D2] px-2.5 py-1 text-[9.5px] font-bold tracking-[0.04em] text-[#7B6A28]">
                  {offerPercent}% OFF
                </span>
              </>
            ) : bundle.compareAt > bundle.price ? (
              <>
                <span className="text-[13px] text-[#9A9789] line-through">
                  {fmtPrice(bundle.compareAt)}
                </span>
                {bundle.saveLabel && (
                  <span className="rounded-full bg-[#EBE4D2] px-2.5 py-1 text-[9.5px] font-bold tracking-[0.04em] text-[#7B6A28]">
                    {bundle.saveLabel}
                  </span>
                )}
              </>
            ) : null}
          </div>

          {bundleId === "duo" && (
            <p className="mt-1 text-[11px] font-medium text-[#8A7A2E]">
              {fmtPrice(effectivePrice / bundle.units)} per lamp · save{" "}
              {fmtPrice(
                discountPrice(BUNDLES.single.price) * 2 - effectivePrice
              )}{" "}
              vs. two singles
            </p>
          )}

          <div className="mt-4 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#2B3022]/10" />
            <span className="text-[10.5px] font-medium text-[#8A8779]">
              Two rooms. One calmer bedtime.
            </span>
            <span className="h-px flex-1 bg-[#2B3022]/10" />
          </div>

          <div className="mt-3 space-y-2.5">
            <BundleOption
              id="single"
              selected={bundleId === "single"}
              onSelect={setBundleId}
              variants={variants}
              onVariantChange={setVariant}
              discountPercent={offerActive ? offerPercent : 0}
            />
            <BundleOption
              id="duo"
              selected={bundleId === "duo"}
              onSelect={setBundleId}
              variants={variants}
              onVariantChange={setVariant}
              discountPercent={offerActive ? offerPercent : 0}
            />
          </div>

          <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#2B3022]/10 bg-[#FBF8F1] p-2">
            <button
              type="button"
              onClick={() => setDemoOpen(true)}
              aria-label="Open full color demo video"
              className="group relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#EFE8D8]"
            >
              <Image
                src="/assets/pear/videos/color-demo.gif"
                alt="Pear Glow lamp cycling through glow colors"
                width={280}
                height={280}
                unoptimized
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-[#20241B]/20 transition-colors group-hover:bg-[#20241B]/30">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4 fill-[#F8F4EC]"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
            <div className="min-w-0 flex-1">
              <p className="text-[11.5px] font-semibold text-[#2C3024]">
                See the tap control
              </p>
              <p className="mt-0.5 text-[10px] leading-snug text-[#8A8779]">
                Auto-playing color demo — tap to watch the full clip.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDemoOpen(true)}
              className="shrink-0 rounded-full border border-[#2B3022]/12 bg-white/70 px-3 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.08em] text-[#4F5246] transition-colors hover:bg-white"
            >
              Watch
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-[#C9A84C]/25 bg-[#FBF3DF] px-3 py-2 text-[10.5px] font-medium text-[#7B5E1F]">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B55A3C] opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B55A3C]" />
            </span>
            <span>
              <strong className="font-bold">Only {STOCK_LEFT} units left</strong>{" "}
              in our India warehouse
            </span>
            <span className="ml-auto hidden text-[9.5px] font-normal text-[#8A7A2E] sm:inline">
              Reserve yours before the timer ends
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-3 flex h-[52px] w-full items-center justify-center rounded-full bg-[#8A7A2E] text-[14.5px] font-semibold text-[#F8F4EC] transition-all hover:-translate-y-0.5 hover:bg-[#7A6C27] active:translate-y-0"
          >
            Add to cart
          </button>

          <PaymentMarks
            ids={HERO_PAYMENTS}
            className="mt-3.5 justify-center opacity-95"
          />

          <div className="mt-3 rounded-xl border border-[#2B3022]/10 bg-[#FBF8F1] px-3.5 py-3">
            <ul className="space-y-1.5 text-[10.5px] leading-snug text-[#5F6053]">
              <li className="flex items-start gap-2">
                <CheckIcon className="mt-[1px] h-3 w-3 shrink-0 text-[#8A7A2E]" />
                Free shipping across India · dispatched in 1–2 business days ·
                delivered in 4–8 business days
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="mt-[1px] h-3 w-3 shrink-0 text-[#8A7A2E]" />
                7-day replacement guarantee for damaged or defective lamps ·
                approved within 24 hours
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="mt-[1px] h-3 w-3 shrink-0 text-[#8A7A2E]" />
                <span>
                  Indian WhatsApp support:{" "}
                  <a
                    href={whatsappLink(
                      "Hi Pear Glow! I have a question before ordering."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#3D4034] underline decoration-[#BDB6A4] underline-offset-2 transition-colors hover:text-[#8A7A2E]"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>{" "}
                  · Mon–Sat, 10 AM–7 PM IST
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-4 flex gap-3 rounded-xl border border-[#2B3022]/10 bg-[#F3EEE2] p-3.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E7D8B8] text-[11px] font-bold text-[#7B6A28]">
              PS
            </span>
            <div className="min-w-0">
              <Stars value={5} size={11} />
              <p className="mt-1.5 text-[12px] leading-snug text-[#4F5246]">
                My daughter absolutely loves this little lamp and takes it
                everywhere.
              </p>
              <p className="mt-1 text-[11px] leading-snug text-[#8A8779]">
                Backed by our money back guarantee for peace of mind.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#DDE5CE] px-2 py-1 text-[9px] font-semibold text-[#5C7145]">
                <CheckIcon className="h-2.5 w-2.5" /> Verified Purchase
              </span>
            </div>
          </div>

          <div className="mt-3">
            {MINI_FAQS.map((faq, index) => (
              <details
                key={faq.q}
                open={index === 0}
                className="group border-b border-[#2B3022]/10 first:border-t"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3 text-[12.5px] font-medium text-[#3D4034] [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown className="h-4 w-4 shrink-0 text-[#6E6D62] transition-transform group-open:rotate-180" />
                </summary>
                <p className="-mt-0.5 pb-3.5 pr-6 text-[11.5px] leading-relaxed text-[#777567]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {zoomed && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#1C2017]/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Product image"
        >
          <button
            type="button"
            onClick={() => setZoomed(false)}
            aria-label="Close image"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          <div className="relative h-[82vh] w-full max-w-[720px]">
            <Image
              src={GALLERY[activeImage].src}
              alt={GALLERY[activeImage].alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </div>
      )}

      {demoOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#1C2017]/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Pear Glow color demo"
        >
          <button
            type="button"
            onClick={() => setDemoOpen(false)}
            aria-label="Close color demo"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          <div className="w-full max-w-[330px]">
            <video
              src={HERO_VIDEO.src}
              poster={HERO_VIDEO.poster}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="mx-auto max-h-[78vh] w-full rounded-2xl bg-black object-contain"
            />
            <p className="mt-3 text-center text-[11px] leading-relaxed text-[#F8F4EC]/80">
              Tap the lamp to cycle the glow. This demo is silent.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function BundleOption({
  id,
  selected,
  onSelect,
  variants,
  onVariantChange,
  discountPercent = 0,
}: {
  id: BundleId;
  selected: boolean;
  onSelect: (id: BundleId) => void;
  variants: string[];
  onVariantChange: (index: number, id: string) => void;
  discountPercent?: number;
}) {
  const bundle = BUNDLES[id];
  const effectivePrice =
    discountPercent > 0
      ? Math.round(bundle.price * (1 - discountPercent / 100))
      : bundle.price;
  const singleEffective =
    discountPercent > 0
      ? Math.round(BUNDLES.single.price * (1 - discountPercent / 100))
      : BUNDLES.single.price;
  const pairSaving = singleEffective * 2 - effectivePrice;
  return (
    <div
      className={`relative rounded-xl border transition-all ${
        selected
          ? "border-[#8A7A2E] bg-[#FAF6E8] ring-1 ring-[#8A7A2E]"
          : id === "duo"
            ? "border-[#D9CBA2] bg-[#FBF7EC]"
            : "border-[#D8D2C3] bg-white/60"
      }`}
    >
      {bundle.badge && (
        <span className="absolute -top-[9px] right-3 rounded-full bg-[#C9A84C] px-2.5 py-[3px] text-[8px] font-bold uppercase tracking-[0.1em] text-[#2B2512]">
          {bundle.badge}
        </span>
      )}
      <button
        type="button"
        onClick={() => onSelect(id)}
        aria-pressed={selected}
        className="flex w-full items-center gap-3 px-3.5 py-3.5 text-left"
      >
        <span
          className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-colors ${
            selected
              ? "border-[#8A7A2E] bg-[#8A7A2E] text-white"
              : "border-[#BDB7A7] bg-white text-transparent"
          }`}
          aria-hidden="true"
        >
          <CheckIcon className="h-3 w-3" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-[13px] font-semibold text-[#2C3024]">
              {bundle.label}
            </span>
            {bundle.saveLabel && bundle.compareAt > bundle.price && (
              <span className="rounded-full bg-[#EBE4D2] px-2 py-[3px] text-[8.5px] font-bold tracking-[0.04em] text-[#7B6A28]">
                {bundle.saveLabel}
              </span>
            )}
          </span>
          {bundle.rationale && (
            <span className="mt-0.5 block text-[10px] leading-snug text-[#8A8779]">
              {bundle.rationale}
            </span>
          )}
          {id === "duo" && (
            <span className="mt-0.5 block text-[10px] font-semibold text-[#8A7A2E]">
              {fmtPrice(effectivePrice / bundle.units)} per lamp · save{" "}
              {fmtPrice(pairSaving)} vs. two singles
            </span>
          )}
        </span>
        <span className="shrink-0 text-right">
          <span className="block text-[18px] font-semibold tracking-[-0.02em] text-[#23271C]">
            {fmtPrice(effectivePrice)}
          </span>
          {discountPercent > 0 ? (
            <span className="block text-[10.5px] text-[#9A9789] line-through">
              {fmtPrice(bundle.price)}
            </span>
          ) : bundle.compareAt > bundle.price ? (
            <span className="block text-[10.5px] text-[#9A9789] line-through">
              {fmtPrice(bundle.compareAt)}
            </span>
          ) : null}
        </span>
      </button>

      {selected && (
        <div className="space-y-2 rounded-b-xl border-t border-[#2B3022]/10 bg-[#F5EDDA]/70 px-3 py-3">
          {Array.from({ length: bundle.units }).map((_, index) => (
            <VariantSelect
              key={index}
              label={`Lamp ${index + 1}`}
              value={variants[index]}
              onChange={(variantId) => onVariantChange(index, variantId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function VariantSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (id: string) => void;
}) {
  const active = VARIANTS.find((variant) => variant.id === value) ?? VARIANTS[0];
  return (
    <div className="relative">
      <span className="sr-only">{label}</span>
      <span className="pointer-events-none absolute left-2.5 top-1/2 z-10 h-6 w-6 -translate-y-1/2 overflow-hidden rounded-md bg-[#EFE8D8]">
        <Image
          src={active.image}
          alt=""
          fill
          sizes="24px"
          className="object-cover"
        />
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        className="h-[42px] w-full cursor-pointer appearance-none rounded-lg border border-[#2B3022]/12 bg-white/80 pl-11 pr-9 text-[12px] font-medium text-[#3D4034] outline-none transition-colors hover:border-[#8A7A2E]/60 focus:border-[#8A7A2E] focus:ring-2 focus:ring-[#8A7A2E]/15"
      >
        {VARIANTS.map((variant) => (
          <option key={variant.id} value={variant.id}>
            {variant.name}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6E6D62]" />
    </div>
  );
}
