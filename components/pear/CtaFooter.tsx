import {
  FOOTER_PAYMENTS,
  PaymentMarks,
  WhatsAppIcon,
} from "./Common";

const SHOP_LINKS = [
  { label: "Night Lamps", href: "/#buy" },
  { label: "Gift Sets", href: "/#buy" },
  { label: "New Arrivals", href: "/#buy" },
  { label: "Best Sellers", href: "/#buy" },
  { label: "All Products", href: "/#buy" },
];

const HELP_LINKS = [
  { label: "FAQ", href: "/#faq" },
  { label: "Shipping", href: "/policies" },
  { label: "Returns", href: "/policies" },
  { label: "Care Guide", href: "/#faq" },
  { label: "Charging", href: "/#faq" },
  { label: "Track Order", href: "https://wa.me/919554669084" },
];

const ABOUT_LINKS = [
  { label: "Our Story", href: "/#story" },
  { label: "Safety", href: "/#story" },
  { label: "Reviews", href: "/#reviews" },
];

export default function CtaFooter() {
  return (
    <footer
      id="contact"
      className="scroll-mt-20 border-t border-white/10 bg-[#4B593B] text-[#EDE7D7]"
    >
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="grid grid-cols-2 gap-8 py-10 sm:gap-9 lg:grid-cols-[1.2fr_0.75fr_0.75fr_0.7fr_1fr] lg:gap-7 lg:py-12">
          <div className="col-span-2 lg:col-span-1">
            <p className="text-[30px] font-semibold tracking-[-0.03em] text-[#F8F4EC]">
              Pear Glow
            </p>
          </div>

          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Help" links={HELP_LINKS} />
          <FooterColumn title="About" links={ABOUT_LINKS} />

          <div>
            <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#D9C58D]">
              Pear Glow
            </p>
            <p className="mt-3 max-w-[210px] text-[11.5px] leading-[1.75] text-[#D2D2BE]">
              Bringing a warm and reassuring bedtime glow to children&rsquo;s
              rooms everywhere.
            </p>
            <a
              href="https://wa.me/919554669084"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-[11.5px] text-[#F0EADB] underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
            >
              Contact Us
            </a>
            <p className="mt-1 text-[10px] text-[#B9BDA8]">
              WhatsApp support · Mon–Sat, 10 AM–7 PM IST
            </p>
            <div className="mt-4 flex items-center gap-3.5">
              <SocialLink
                label="WhatsApp"
                href="https://wa.me/919554669084"
                icon="whatsapp"
              />
              <SocialLink
                label="YouTube"
                href="https://www.youtube.com/"
                icon="youtube"
              />
              <SocialLink
                label="TikTok"
                href="https://www.tiktok.com/"
                icon="tiktok"
              />
              <SocialLink
                label="Instagram"
                href="https://www.instagram.com/"
                icon="instagram"
              />
              <SocialLink
                label="Email"
                href="mailto:hello@pearglow.in"
                icon="mail"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/12 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9.5px] text-[#B9BDA8]">
            &copy; 2026 Pear Glow. All rights reserved. Rated 4.6 out of 5 by
            1,240 parents.
          </p>
          <PaymentMarks ids={FOOTER_PAYMENTS} className="sm:justify-end" />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#D9C58D]">
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-[11.5px] text-[#E4E0D0] transition-colors hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: "whatsapp" | "youtube" | "tiktok" | "instagram" | "mail";
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      aria-label={label}
      className="text-[#D9D5C5] transition-colors hover:text-white"
    >
      {icon === "whatsapp" ? (
        <WhatsAppIcon className="h-[15px] w-[15px]" />
      ) : icon === "instagram" ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="h-[15px] w-[15px]"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.7" fill="currentColor" />
        </svg>
      ) : icon === "youtube" ? (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-[15px] w-[15px]"
          aria-hidden="true"
        >
          <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.5A2.7 2.7 0 0 0 2.4 7.2 28.4 28.4 0 0 0 2 12a28.4 28.4 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A28.4 28.4 0 0 0 22 12a28.4 28.4 0 0 0-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z" />
        </svg>
      ) : icon === "tiktok" ? (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-[15px] w-[15px]"
          aria-hidden="true"
        >
          <path d="M16.6 2h-3.1v13.3a2.6 2.6 0 1 1-2.2-2.6V9.5a5.8 5.8 0 1 0 5.3 5.8V9.1a7.6 7.6 0 0 0 4.4 1.4V7.4a4.5 4.5 0 0 1-4.4-4.4V2Z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="h-[15px] w-[15px]"
          aria-hidden="true"
        >
          <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
          <path d="m3 6 9 7 9-7" />
        </svg>
      )}
    </a>
  );
}
