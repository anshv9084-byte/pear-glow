import Image from "next/image";
import {
  COMPARISON,
  FAQS,
  FEATURES,
  HAPPY_FAMILIES,
  RATING,
  REVIEW_COUNT,
  REVIEWS,
  SPECS,
  STEPS,
  VIDEO_REVIEWS,
} from "@/lib/pear-catalog";
import type { ComparisonVisual } from "@/lib/pear-catalog";
import AutoVideo from "./AutoVideo";
import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/site";
import {
  CheckIcon,
  ChevronDown,
  Eyebrow,
  FeatureIcon,
  Stars,
  WhatsAppIcon,
} from "./Common";

const PROMISES = [
  {
    title: "Free delivery, clear timeline",
    body: "Every order is dispatched in 1–2 business days and delivered in 4–8 business days across India. Tracking is sent by SMS, email or WhatsApp.",
    icon: "check",
  },
  {
    title: "7-day replacement guarantee",
    body: "If your lamp arrives damaged or defective, send us a photo within 7 days. Once approved, we arrange a replacement within 24 hours.",
    icon: "check",
  },
  {
    title: "Indian support, real hours",
    body: `Chat with our India-based team on WhatsApp at ${WHATSAPP_DISPLAY}, Monday–Saturday, 10 AM–7 PM IST, or email hello@pearglow.in.`,
    icon: "whatsapp",
  },
] as const;

export function StorySection() {
  return (
    <section id="story" className="scroll-mt-24 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="max-w-[460px] text-[32px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#23271C] sm:text-[42px]">
              Bedtime shouldn&rsquo;t feel like a{" "}
              <span className="font-accent italic text-[#8A7A2E]">battle</span>
            </h2>
            <p className="mt-4 max-w-[430px] text-[13.5px] leading-[1.75] text-[#6B6A5C]">
              Give your child something warm and squishy to hold while the room
              stays dim. The 30-minute fade-out then does the part you usually
              have to do — quietly ending the night without another trip back
              into the room.
            </p>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[20px] bg-[#EFE8D8]">
            <Image
              src="/assets/pear/glow-podium.webp"
              alt="Pear Glow lamp glowing warmly on a green bedside stool"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-12 grid items-center gap-8 sm:mt-16 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-square overflow-hidden rounded-[20px] bg-[#E7E3DA]">
            <Image
              src="/assets/pear/nursery-mint.webp"
              alt="Pear Glow lamp glowing mint in a cozy nursery"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <Eyebrow>A routine they control</Eyebrow>
            <h3 className="mt-2 max-w-[460px] text-[28px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#23271C] sm:text-[36px]">
              Tap a color. Start the 30-minute fade-out.
            </h3>
            <p className="mt-3 max-w-[430px] text-[13px] leading-[1.7] text-[#6B6A5C]">
              Seven soft colors give your child a small, safe choice at bedtime.
              One tap starts the timer, and the lamp dims on its own while they
              settle.
            </p>

            <div className="mt-5 grid overflow-hidden rounded-xl bg-[#F3EDE0] sm:grid-cols-2">
              <div className="p-4 sm:p-5">
                <p className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#8A7A2E]">
                  Safety first
                </p>
                <ul className="mt-2.5 space-y-2">
                  <li className="flex items-start gap-2 text-[11.5px] leading-snug text-[#66675A]">
                    <CheckIcon className="mt-[2px] h-3 w-3 shrink-0 text-[#8A7A2E]" />
                    BPA-free silicone material
                  </li>
                  <li className="flex items-start gap-2 text-[11.5px] leading-snug text-[#66675A]">
                    <CheckIcon className="mt-[2px] h-3 w-3 shrink-0 text-[#8A7A2E]" />
                    No hot glass bulbs
                  </li>
                </ul>
              </div>
              <div className="border-t border-[#2B3022]/8 p-4 sm:border-l sm:border-t-0 sm:p-5">
                <p className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#8A7A2E]">
                  Bedtime ease
                </p>
                <p className="mt-2.5 text-[11.5px] leading-relaxed text-[#66675A]">
                  Designed to provide a calming ambient glow rather than
                  blinding illumination.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-4 gap-2">
              {FEATURES.map((feature) => (
                <div key={feature.label} className="text-center">
                  <span className="inline-flex text-[#6C7A4B]">
                    <FeatureIcon name={feature.icon} />
                  </span>
                  <p className="mt-2 whitespace-pre-line text-[8.5px] font-semibold uppercase leading-[1.5] tracking-[0.1em] text-[#5C5B4D]">
                    {feature.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StepsSection() {
  return (
    <section
      id="how"
      className="scroll-mt-24 border-t border-[#2B3022]/8 py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16">
          <div>
            <Eyebrow>The wind-down</Eyebrow>
            <h2 className="mt-2 max-w-[430px] text-[30px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#23271C] sm:text-[40px]">
              A three-step routine
              <br />
              that ends on its own
            </h2>
            <p className="mt-3 max-w-[420px] text-[13px] leading-relaxed text-[#6B6A5C]">
              Same order every night: pick a glow, start the timer, and let the
              lamp finish the routine while you leave the room.
            </p>

            <ol className="mt-7 space-y-5">
              {STEPS.map((step, index) => (
                <li key={step.tag} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#2B3022]/22 text-[10.5px] font-semibold text-[#4F5246]">
                    {index + 1}
                  </span>
                  <div>
                    <span className="inline-block rounded-[3px] bg-[#EFE8D8] px-1.5 py-[3px] text-[8px] font-semibold uppercase tracking-[0.12em] text-[#7B6A28]">
                      {step.tag}
                    </span>
                    <h3 className="mt-1 text-[15px] font-semibold tracking-[-0.01em] text-[#2C3024]">
                      {step.title}
                    </h3>
                    <p className="mt-1 max-w-[420px] text-[12px] leading-[1.7] text-[#6B6A5C]">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative aspect-square overflow-hidden rounded-[20px] bg-[#EFE8D8]">
            <Image
              src="/assets/pear/pink-room.webp"
              alt="Pear Glow lamp glowing in a child's bedroom"
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SpecsSection() {
  return (
    <section
      id="specs"
      className="scroll-mt-24 border-t border-[#2B3022]/8 py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="grid items-start gap-9 lg:grid-cols-2 lg:gap-20">
          <dl className="border-t border-[#2B3022]/14">
            {SPECS.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-6 border-b border-[#2B3022]/10 py-3.5"
              >
                <dt className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#8A8779]">
                  {label}
                </dt>
                <dd className="text-right text-[11.5px] font-medium text-[#3D4034]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="lg:pt-1">
            <Eyebrow>Specifications</Eyebrow>
            <h2 className="mt-2 max-w-[420px] text-[30px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#23271C] sm:text-[40px]">
              Clear details, no surprises
            </h2>
            <p className="mt-3 max-w-[400px] text-[13px] leading-[1.75] text-[#6B6A5C]">
              Everything you need to know before it arrives — plus the delivery,
              replacement and support promises below.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PromiseSection() {
  return (
    <section
      id="promise"
      className="scroll-mt-24 border-t border-[#2B3022]/8 py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="mx-auto max-w-[640px] text-center">
          <Eyebrow>No surprises</Eyebrow>
          <h2 className="mt-2 text-[30px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#23271C] sm:text-[38px]">
            What happens after you order
          </h2>
          <p className="mx-auto mt-2 max-w-[470px] text-[12.5px] leading-relaxed text-[#6B6A5C]">
            Clear timelines, an India-based support team, and a replacement
            promise — before you pay, not buried in a footer.
          </p>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {PROMISES.map((promise) => (
            <article
              key={promise.title}
              className="rounded-2xl bg-[#F3EEE2] p-5"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E7D8B8] text-[#7B6A28]">
                {promise.icon === "whatsapp" ? (
                  <WhatsAppIcon className="h-4 w-4" />
                ) : (
                  <CheckIcon className="h-4 w-4" />
                )}
              </span>
              <h3 className="mt-3 text-[14px] font-semibold tracking-[-0.01em] text-[#2C3024]">
                {promise.title}
              </h3>
              <p className="mt-1.5 text-[11.5px] leading-[1.7] text-[#6B6A5C]">
                {promise.body}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-5 text-center text-[11px] text-[#8A8779]">
          Questions before ordering?{" "}
          <a
            href={whatsappLink(
              "Hi Pear Glow! I have a question before ordering."
            )}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[#6B5F24] underline decoration-[#C9C3B4] underline-offset-4 transition-colors hover:text-[#23271C]"
          >
            Chat with our India-based team →
          </a>
        </p>
      </div>
    </section>
  );
}

export function CompareSection() {
  return (
    <section
      id="compare"
      className="scroll-mt-24 bg-[#F2ECDF] py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="mx-auto max-w-[660px] text-center">
          <h2 className="text-[28px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#23271C] sm:text-[38px]">
            A calmer wind-down,{" "}
            <span className="font-accent italic text-[#8A7A2E]">
              without the glare
            </span>
          </h2>
          <p className="mx-auto mt-2 max-w-[440px] text-[12.5px] leading-relaxed text-[#6B6A5C]">
            See why a 30-minute fade-out routine works better for tired toddlers
            than plug-ins or overhead lights.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-5">
          {COMPARISON.map((item, index) => (
            <article
              key={item.title}
              className={`overflow-hidden rounded-[18px] bg-[#FBF8F1] text-center ${
                index === 0
                  ? "shadow-[0_16px_36px_-28px_rgba(70,66,36,0.5)]"
                  : "opacity-95"
              }`}
            >
              <div className="relative aspect-[5/4] overflow-hidden bg-[#E8E0CE]">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.alt ?? item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <ComparisonArt kind={item.visual} />
                )}
              </div>
              <div className="flex flex-col items-center p-4 sm:p-5">
                <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-[#23271C]">
                  {item.title}
                </h3>
                <p className="mx-auto mt-1.5 max-w-[280px] text-[11.5px] leading-[1.65] text-[#6B6A5C]">
                  {item.body}
                </p>
                <span
                  className={`mt-3 inline-flex rounded-full border px-2.5 py-[3px] text-[7.5px] font-bold uppercase tracking-[0.1em] ${
                    index === 0
                      ? "border-[#8A7A2E] bg-[#F2E9CF] text-[#7B6A28]"
                      : "border-[#2B3022]/10 bg-[#EFE8D8] text-[#8A8779]"
                  }`}
                >
                  {item.badge}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonArt({ kind }: { kind: ComparisonVisual }) {
  if (kind === "plug-in") return <PlugInArt />;
  if (kind === "overhead") return <OverheadArt />;
  return null;
}

function PlugInArt() {
  return (
    <svg
      viewBox="0 0 400 320"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of a standard plug-in night light fixed in a wall socket"
    >
      <rect width="400" height="320" fill="#EAE4D8" />
      <rect
        x="62"
        y="48"
        width="172"
        height="224"
        rx="18"
        fill="#F8F4EA"
        stroke="#D2C8B5"
        strokeWidth="3"
      />
      <rect x="94" y="84" width="108" height="62" rx="16" fill="#D9D1C0" />
      <rect x="128" y="104" width="9" height="22" rx="4.5" fill="#8F8674" />
      <rect x="159" y="104" width="9" height="22" rx="4.5" fill="#8F8674" />
      <rect x="94" y="166" width="108" height="62" rx="16" fill="#D9D1C0" />
      <circle cx="148" cy="197" r="44" fill="#FFF0B8" opacity="0.55" />
      <circle
        cx="148"
        cy="197"
        r="30"
        fill="#FFF6D8"
        stroke="#E2C96A"
        strokeWidth="3"
      />
      <path
        d="M134 197h28"
        stroke="#D8B95A"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g
        stroke="#E3C45C"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.65"
      >
        <path d="m208 168 18-10" />
        <path d="M214 197h22" />
        <path d="m208 226 18 10" />
      </g>
      <g transform="translate(286 62)">
        <circle
          cx="28"
          cy="28"
          r="26"
          fill="#F8F4EA"
          stroke="#C4B9A4"
          strokeWidth="2"
        />
        <path
          d="M28 13v16l10 6"
          fill="none"
          stroke="#8F8674"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M9 47 47 9"
          stroke="#A75B4C"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M250 270c20-8 45-8 66 0"
        fill="none"
        stroke="#CFC5B2"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

function OverheadArt() {
  return (
    <svg
      viewBox="0 0 400 320"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of a bright overhead bedroom ceiling light above a bed"
    >
      <rect width="400" height="320" fill="#E7E1D5" />
      <rect width="400" height="30" fill="#D3C9B7" />
      <path d="M200 30v46" stroke="#8F8674" strokeWidth="4" />
      <path
        d="M154 76h92l18 38H136z"
        fill="#F1E6C9"
        stroke="#CFC3A2"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <ellipse cx="200" cy="114" rx="46" ry="11" fill="#FFF3BA" />
      <path d="M200 126 112 288h176L200 126Z" fill="#F9E7A1" opacity="0.5" />
      <path d="M200 126 158 276h84L200 126Z" fill="#FFF2B8" opacity="0.7" />
      <g
        stroke="#E2C15B"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      >
        <path d="M200 150v18" />
        <path d="m164 164-10 16" />
        <path d="m236 164 10 16" />
      </g>
      <rect x="82" y="250" width="236" height="18" rx="9" fill="#C8BDAA" />
      <rect x="92" y="226" width="54" height="30" rx="12" fill="#DED5C4" />
      <path d="M176 232h116v22H176z" fill="#BFB09A" opacity="0.8" />
      <rect x="86" y="262" width="12" height="34" rx="5" fill="#B8AC97" />
      <rect x="302" y="262" width="12" height="34" rx="5" fill="#B8AC97" />
    </svg>
  );
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="scroll-mt-24 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Parent feedback</Eyebrow>
            <h2 className="mt-2 text-[30px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#23271C] sm:text-[38px]">
              What parents tell us about bedtime
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-3.5 rounded-xl border border-[#2B3022]/10 bg-white/50 px-4 py-3">
            <span className="text-[30px] font-semibold leading-none tracking-[-0.03em] text-[#23271C]">
              {RATING}
            </span>
            <div>
              <Stars value={RATING} size={13} />
              <p className="mt-1 text-[10px] text-[#777567]">
                Based on {REVIEW_COUNT} verified reviews
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#8A7A2E]">
                Video demos
              </p>
              <h3 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#23271C]">
                See the glow in action
              </h3>
            </div>
            <p className="text-[10.5px] text-[#8A8779]">
              Silent clips of the actual lamp - tap to pause or replay.
            </p>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {VIDEO_REVIEWS.map((video) => (
              <figure
                key={video.src}
                className="overflow-hidden rounded-xl border border-[#2B3022]/10 bg-[#FBF8F1]"
              >
                <div className="relative aspect-[4/5] bg-[#E8E0CE]">
                  <AutoVideo
                    src={video.src}
                    poster={video.poster}
                    label={video.title}
                    className="h-full w-full object-cover"
                  />
                  <span className="pointer-events-none absolute left-2.5 top-2.5 rounded-full bg-[#20241B]/60 px-2.5 py-1 text-[8.5px] font-semibold text-[#F8F4EC] backdrop-blur-sm">
                    Real lamp footage
                  </span>
                </div>
                <figcaption className="p-3.5">
                  <p className="text-[12px] font-semibold text-[#2C3024]">
                    {video.title}
                  </p>
                  <p className="mt-1 text-[10.5px] leading-relaxed text-[#777567]">
                    {video.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((review) => (
            <article
              key={review.name}
              className="flex flex-col rounded-xl bg-[#F3EEE2] p-4"
            >
              <Stars value={review.stars} size={12} />
              <p className="mt-2.5 flex-1 text-[11.5px] leading-[1.65] text-[#5F6053]">
                {review.text}
              </p>
              <div className="mt-3.5">
                <p className="text-[11px] font-semibold text-[#3D4034]">
                  {review.name}
                </p>
                <p className="mt-0.5 text-[9.5px] text-[#9A9789]">
                  Verified buyer
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FamiliesSection() {
  return (
    <section
      id="families"
      className="scroll-mt-24 border-t border-[#2B3022]/8 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Real bedtime setups</Eyebrow>
            <h2 className="mt-2 text-[30px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#23271C] sm:text-[38px]">
              A calmer bedtime, in every room
            </h2>
            <p className="mt-2 max-w-[500px] text-[12.5px] leading-relaxed text-[#6B6A5C]">
              Dim nurseries, bedside corners and story-time setups — only real
              lifestyle photography, no factory or packaging shots.
            </p>
          </div>
          <a
            href={whatsappLink(
              "Hi Pear Glow! I'd like to share a bedtime video of my child with the lamp."
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#2B3022]/12 bg-white/60 px-4 py-2.5 text-[11.5px] font-semibold text-[#4F5246] transition-colors hover:bg-white"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#5C7145]" />
            Share your bedtime video
          </a>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {HAPPY_FAMILIES.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-square overflow-hidden rounded-xl bg-[#EFE8D8]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.05]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-[#2B3022]/8 py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[760px] px-5 text-center lg:px-8">
        <Eyebrow>FAQs</Eyebrow>
        <h2 className="mt-2 text-[30px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#23271C] sm:text-[38px]">
          Frequently asked questions
        </h2>
        <p className="mx-auto mt-2 max-w-[500px] text-[12.5px] leading-relaxed text-[#6B6A5C]">
          Straight answers on the 30-minute timer, delivery timelines,
          replacements, charging, and support.
        </p>

        <div className="mt-7 text-left">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="group border-b border-[#2B3022]/12 first:border-t"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[13px] font-semibold text-[#3D4034] [&::-webkit-details-marker]:hidden sm:text-[13.5px]">
                {faq.q}
                <ChevronDown className="h-4 w-4 shrink-0 text-[#6C6A5C] transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-4 pr-8 text-[12px] leading-[1.75] text-[#6B6A5C]">
                {faq.a}
              </p>
            </details>
          ))}
        </div>

        <a
          href="https://wa.me/919554669084"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#2B3022]/12 bg-white/50 px-4 py-2.5 text-[11.5px] font-medium text-[#4F5246] transition-colors hover:bg-white"
        >
          <WhatsAppIcon className="h-4 w-4 text-[#5C7145]" />
          Still have a question? Chat with us
        </a>
      </div>
    </section>
  );
}

export function ClosingCta() {
  return (
    <section className="bg-[#4B593B] text-[#F8F4EC]">
      <div className="border-b border-white/10 py-5">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-center gap-1.5 px-5 text-center">
          <Stars value={RATING} size={12} />
          <p className="text-[10.5px] text-[#D8D2BF]">
            Join thousands of parents enjoying peaceful bedtimes.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[800px] px-5 py-12 text-center sm:py-16">
        <h2 className="mx-auto text-[30px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[40px]">
          Tonight, try a softer wind-down
        </h2>
        <p className="mx-auto mt-3 max-w-[470px] text-[12.5px] leading-relaxed text-[#D8D2BF]">
          A warm glow your child can hold, a 30-minute fade-out you
          don&rsquo;t have to manage, and a calmer room in under half an hour.
        </p>
        <a
          href="#buy"
          className="mt-6 inline-flex h-[46px] items-center justify-center rounded-full bg-[#D9B86A] px-7 text-[12.5px] font-semibold text-[#2B2512] transition-all hover:-translate-y-0.5 hover:bg-[#E4C67D] active:translate-y-0"
        >
          Get yours
        </a>
        <p className="mt-3 text-[10.5px] text-[#D8D2BF]/85">
          Free shipping across India · UPI QR or COD · 7-day replacement
        </p>
      </div>
    </section>
  );
}
