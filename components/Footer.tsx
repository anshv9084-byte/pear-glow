import Link from "next/link";

const SHOP_LINKS = [
  { label: "The Lamp", href: "/#collection" },
  { label: "FAQs", href: "/#faq" },
  { label: "Reviews", href: "/#reviews" },
];

const LEGAL_LINKS = [
  { label: "Returns & Refunds", href: "/policies#returns" },
  { label: "Shipping Policy", href: "/policies#shipping" },
  { label: "Privacy Policy", href: "/policies#privacy" },
  { label: "Terms of Service", href: "/policies#terms" },
  { label: "Contact", href: "/policies#contact" },
];

const PAYMENT_METHODS = ["UPI QR (Paytm)", "Cash on Delivery"];

export default function Footer() {
  return (
    <footer className="bg-[#0B1020] border-t border-[#1A2244] pt-16 pb-8" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Col 1: Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFB86B] shadow-[0_0_8px_#FFB86B] lamp-glow" aria-hidden="true" />
              <span className="font-heading text-lg font-semibold tracking-widest text-white">
                SOFTGLOW
              </span>
            </div>
            <p className="text-[#C3CBE6] text-sm leading-relaxed mb-4 max-w-xs">
              A gentle glow for every night. Soft silicone, 7 colors, one tap.
            </p>
            <p className="text-[#8B94B8] text-xs leading-relaxed">
              Free shipping across India.
              <br />
              Dispatched in 1-2 business days.
            </p>
          </div>

          {/* Col 2: Spacer */}
          <div className="hidden md:block" />

          {/* Col 3: Shop */}
          <div>
            <p className="text-white text-sm font-semibold tracking-wider mb-5 uppercase">
              Shop
            </p>
            <ul className="space-y-3">
              {SHOP_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[#C3CBE6] hover:text-[#FFB86B] text-sm transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div>
            <p className="text-white text-sm font-semibold tracking-wider mb-5 uppercase">
              Legal
            </p>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[#C3CBE6] hover:text-[#FFB86B] text-sm transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payments + bottom bar */}
        <div className="border-t border-[#1A2244] pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-6">
            <p className="text-[#8B94B8] text-xs font-medium tracking-wide">We accept</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {PAYMENT_METHODS.map((method) => (
                <span
                  key={method}
                  className="border border-[#2A3563] bg-[#121933] text-[#C3CBE6] text-[11px] font-semibold px-3 py-1.5 rounded-md"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-[#1A2244] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-[#8B94B8] text-xs">
              © {new Date().getFullYear()} Softglow. All rights reserved.
            </p>
            <p className="text-[#8B94B8] text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB86B] lamp-glow" aria-hidden="true" />
              Shipping across India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
