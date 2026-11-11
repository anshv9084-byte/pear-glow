import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Policies — Softglow",
  description: "Returns, shipping, privacy policy, terms of service and contact information for Softglow.",
};

const SECTIONS = [
  { id: "returns", label: "Returns & Refunds" },
  { id: "shipping", label: "Shipping Policy" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms of Service" },
  { id: "contact", label: "Contact" },
];

export default function PoliciesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0B1020] min-h-screen pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="mb-12">
            <p className="text-[#FFB86B] text-xs font-semibold tracking-[0.3em] mb-3">LEGAL</p>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white">
              Our Policies
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Sticky sidebar nav */}
            <aside className="md:w-56 flex-shrink-0">
              <nav aria-label="Policy navigation" className="md:sticky md:top-24 space-y-2">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-[#A9B1D1] hover:text-[#FFB86B] text-sm py-2 px-3 rounded-lg hover:bg-[#121933] transition-all duration-200"
                  >
                    {s.label}
                  </a>
                ))}
                <div className="pt-4">
                  <Link
                    href="/"
                    className="text-[#5C6590] hover:text-white text-sm transition-colors"
                  >
                    ← Back to Store
                  </Link>
                </div>
              </nav>
            </aside>

            {/* Content */}
            <div className="flex-1 space-y-16">
              {/* Returns & Refunds */}
              <section id="returns" className="scroll-mt-24">
                <h2 className="font-heading text-2xl font-semibold text-white mb-4 pb-3 border-b border-[#1A2244]">
                  Returns & Refunds
                </h2>
                <div className="prose prose-invert text-[#A9B1D1] text-sm leading-relaxed space-y-4">
                  <p>
                    We offer a <strong className="text-white">7-day replacement policy</strong> for items that
                    arrive damaged or defective. To request a replacement, message us within 7 days of delivery
                    with a photo of the damaged item and your order details.
                  </p>
                  <p>
                    We do <strong className="text-white">not accept change-of-mind returns</strong> after the
                    order has been dispatched. Please review your order carefully before confirming.
                  </p>
                  <p>
                    Replacement items will be dispatched within 1-2 business days of your request being approved.
                  </p>
                  <div className="bg-[#1A2244] rounded-xl p-4 border border-[#FFB86B]/20">
                    <p className="text-[#FFB86B] text-xs font-semibold tracking-wider mb-1">TO REQUEST A REPLACEMENT</p>
                    <p>Message us with: (1) a photo of the damaged item, (2) your order ID or phone number,
                    and (3) your delivery address. We will process your replacement within 24 hours.</p>
                  </div>
                </div>
              </section>

              {/* Shipping Policy */}
              <section id="shipping" className="scroll-mt-24">
                <h2 className="font-heading text-2xl font-semibold text-white mb-4 pb-3 border-b border-[#1A2244]">
                  Shipping Policy
                </h2>
                <div className="text-[#A9B1D1] text-sm leading-relaxed space-y-4">
                  <p>
                    We ship <strong className="text-white">free across India</strong> on all orders.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Processing Time", value: "1-2 business days" },
                      { label: "Delivery Time", value: "4-8 business days" },
                      { label: "Tracking", value: "Sent via SMS/Email" },
                      { label: "Shipping Fee", value: "FREE across India" },
                    ].map((item) => (
                      <div key={item.label} className="bg-[#121933] rounded-xl p-4 border border-[#1A2244]">
                        <p className="text-[#5C6590] text-xs tracking-wider mb-1">{item.label}</p>
                        <p className="text-white font-semibold text-sm">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <p>
                    Orders are dispatched Monday to Saturday. Orders placed on Sundays or public holidays will
                    be processed on the next business day.
                  </p>
                  <p>
                    Cash on Delivery (COD) is available across most pin codes in India. COD orders are confirmed
                    after a verification call or SMS.
                  </p>
                </div>
              </section>

              {/* Privacy Policy */}
              <section id="privacy" className="scroll-mt-24">
                <h2 className="font-heading text-2xl font-semibold text-white mb-4 pb-3 border-b border-[#1A2244]">
                  Privacy Policy
                </h2>
                <div className="text-[#A9B1D1] text-sm leading-relaxed space-y-4">
                  <p>
                    We collect only the information necessary to fulfil your order: name, phone number, email
                    address, and delivery address.
                  </p>
                  <p>
                    We do not sell, rent, or share your personal data with third parties for marketing purposes.
                    Your information is used solely for order fulfilment, delivery tracking, and customer support.
                  </p>
                  <p>
                    We use standard SSL encryption to protect data transmitted through our website. Payment
                    information processed via UPI is handled securely by your payment app and we do not store
                    any payment credentials.
                  </p>
                  <p>
                    By placing an order, you consent to us contacting you via SMS, email, or WhatsApp for
                    order updates and delivery notifications.
                  </p>
                </div>
              </section>

              {/* Terms of Service */}
              <section id="terms" className="scroll-mt-24">
                <h2 className="font-heading text-2xl font-semibold text-white mb-4 pb-3 border-b border-[#1A2244]">
                  Terms of Service
                </h2>
                <div className="text-[#A9B1D1] text-sm leading-relaxed space-y-4">
                  <p>
                    By purchasing from Softglow, you agree to these terms. All products are subject to
                    availability. We reserve the right to cancel orders due to stock unavailability, payment
                    failure, or delivery limitations.
                  </p>
                  <p>
                    Prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes. Prices
                    may change without notice, but orders already placed will be honoured at the price shown
                    at checkout.
                  </p>
                  <p>
                    Product images and descriptions are as accurate as possible. Minor variations in colour
                    due to screen calibration may occur.
                  </p>
                  <p>
                    For COD orders, payment is due at the time of delivery. Refused COD deliveries may result
                    in restrictions on future orders.
                  </p>
                </div>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-24">
                <h2 className="font-heading text-2xl font-semibold text-white mb-4 pb-3 border-b border-[#1A2244]">
                  Contact
                </h2>
                <div className="text-[#A9B1D1] text-sm leading-relaxed space-y-4">
                  <p>
                    For any queries about your order, replacements, or general questions, reach out to us
                    and we&apos;ll respond within 24 hours.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-[#121933] rounded-xl p-4 border border-[#1A2244]">
                      <span className="text-[#FFB86B] text-lg">📱</span>
                      <div>
                        <p className="text-[#5C6590] text-xs tracking-wider mb-0.5">WHATSAPP</p>
                        <a
                          href={whatsappLink("Hi Softglow! I have a question about my order.")}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white font-semibold hover:text-[#FFB86B] transition-colors"
                        >
                          {WHATSAPP_DISPLAY}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-[#121933] rounded-xl p-4 border border-[#1A2244]">
                      <span className="text-[#FFB86B] text-lg">📧</span>
                      <div>
                        <p className="text-[#5C6590] text-xs tracking-wider mb-0.5">EMAIL</p>
                        <p className="text-white font-semibold">hello@softglow.in</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-[#121933] rounded-xl p-4 border border-[#1A2244]">
                      <span className="text-[#FFB86B] text-lg">🕐</span>
                      <div>
                        <p className="text-[#5C6590] text-xs tracking-wider mb-0.5">SUPPORT HOURS</p>
                        <p className="text-white font-semibold">Monday – Saturday, 10 AM – 7 PM IST</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
