"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fmtINR } from "@/lib/format";
import {
  fetchCart,
  removeCartLine,
  updateCartLine,
  type Cart,
  type CartLine,
} from "@/lib/cart";
import { UPI_ID, UPI_NAME, upiLink, whatsappLink } from "@/lib/site";

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15h-.01a8.2 8.2 0 01-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c0 4.54-3.7 8.23-8.23 8.23z" />
    </svg>
  );
}

function QuantityStepper({
  line,
  busy,
  onChange,
}: {
  line: CartLine;
  busy: boolean;
  onChange: (quantity: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-[#2A3563] bg-[#0B1020]">
      <button
        onClick={() => onChange(line.quantity - 1)}
        disabled={busy}
        aria-label={`Decrease quantity of ${line.productTitle}`}
        className="w-9 h-9 text-[#C3CBE6] hover:text-[#FFB86B] disabled:opacity-40 transition-colors"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-semibold text-white">
        {busy ? "…" : line.quantity}
      </span>
      <button
        onClick={() => onChange(line.quantity + 1)}
        disabled={busy}
        aria-label={`Increase quantity of ${line.productTitle}`}
        className="w-9 h-9 text-[#C3CBE6] hover:text-[#FFB86B] disabled:opacity-40 transition-colors"
      >
        +
      </button>
    </div>
  );
}

export default function CartView() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyLine, setBusyLine] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;

    fetchCart().then((result) => {
      if (!active) return;
      setCart(result);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  const changeQuantity = async (line: CartLine, quantity: number) => {
    setBusyLine(line.id);
    const next =
      quantity <= 0
        ? await removeCartLine(line.id)
        : await updateCartLine(line.id, quantity);
    setCart(next);
    setBusyLine(null);
  };

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const orderSummary = cart
    ? cart.lines
        .map(
          (line) =>
            `${line.quantity} × ${line.productTitle}${
              line.variantTitle && line.variantTitle !== "Default Title"
                ? ` (${line.variantTitle})`
                : ""
            } — ${fmtINR.format(line.lineTotal)}`
        )
        .join("\n")
    : "";

  const whatsappMessage = `Hi Softglow! I'd like to place this order:\n\n${orderSummary}\n\nTotal: ${
    cart ? fmtINR.format(cart.total) : ""
  }\n\nMy delivery address: `;

  return (
    <section className="min-h-screen bg-[#0B1020] pt-28 pb-20 md:pb-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#FFB86B] text-xs font-semibold tracking-[0.3em] mb-3">
            ALMOST YOURS
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white">
            Your Cart
          </h1>
          {cart && cart.totalQuantity > 0 && (
            <p className="text-[#C3CBE6] text-sm mt-3">
              {cart.totalQuantity} {cart.totalQuantity === 1 ? "item" : "items"} · Free shipping across India
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 animate-pulse">
            <div className="space-y-4">
              {[0, 1].map((i) => (
                <div key={i} className="h-32 rounded-2xl bg-[#121933] border border-[#1A2244]" />
              ))}
            </div>
            <div className="h-80 rounded-2xl bg-[#121933] border border-[#1A2244]" />
          </div>
        ) : !cart || cart.lines.length === 0 ? (
          <div className="max-w-md mx-auto text-center">
            <div className="relative w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden border border-[#1A2244] bg-[#121933]">
              <Image
                src="/assets/product/lamp-single.jpg"
                alt="Softglow pear lamp"
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
            <h2 className="font-heading text-2xl font-semibold text-white mb-3">
              Your cart is empty
            </h2>
            <p className="text-[#C3CBE6] text-sm leading-relaxed mb-8">
              Pick a glow and we&apos;ll get it on its way. Free shipping across India.
            </p>
            <Link
              href="/#collection"
              className="inline-flex items-center justify-center bg-[#FFB86B] text-[#0B1020] font-bold text-sm px-8 py-3.5 rounded-full hover:bg-[#ffa94d] transition-all duration-200 active:scale-95"
            >
              SHOP THE LAMP
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
            {/* Line items */}
            <div className="space-y-4">
              {cart.lines.map((line) => (
                <div
                  key={line.id}
                  className="flex gap-4 sm:gap-5 p-4 rounded-2xl bg-[#121933] border border-[#1A2244]"
                >
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#1A2244] flex-shrink-0">
                    {line.image ? (
                      <Image
                        src={line.image}
                        alt={line.imageAlt ?? line.productTitle}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#8B94B8] text-xs">
                        Softglow
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="font-heading text-lg font-semibold text-white leading-tight">
                          {line.productTitle}
                        </h2>
                        <p className="text-white font-semibold text-sm whitespace-nowrap">
                          {fmtINR.format(line.lineTotal)}
                        </p>
                      </div>
                      <p className="text-[#8B94B8] text-xs mt-1">
                        {line.variantTitle || "Color-changing silicone lamp"}
                      </p>
                      <p className="text-[#8B94B8] text-xs mt-0.5">
                        {fmtINR.format(line.price)} each
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 mt-3">
                      <QuantityStepper
                        line={line}
                        busy={busyLine === line.id}
                        onChange={(quantity) => changeQuantity(line, quantity)}
                      />
                      <button
                        onClick={() => changeQuantity(line, 0)}
                        disabled={busyLine === line.id}
                        className="text-[#8B94B8] hover:text-[#FFB86B] text-xs font-medium underline underline-offset-4 transition-colors disabled:opacity-40"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <Link
                href="/#collection"
                className="inline-block text-[#FFB86B] text-sm font-semibold tracking-wide hover:underline underline-offset-4 mt-2"
              >
                ← Keep shopping
              </Link>
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-24 rounded-2xl bg-[#121933] border border-[#FFB86B]/20 p-6">
              <h2 className="font-heading text-xl font-semibold text-white mb-5">
                Order Summary
              </h2>

              <dl className="space-y-3 text-sm border-b border-[#1A2244] pb-5">
                <div className="flex items-center justify-between">
                  <dt className="text-[#C3CBE6]">Subtotal</dt>
                  <dd className="text-white font-medium">{fmtINR.format(cart.subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[#C3CBE6]">Shipping</dt>
                  <dd className="text-[#7FE5C8] font-medium">FREE</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[#C3CBE6]">Total</dt>
                  <dd className="font-heading text-2xl font-semibold text-white">
                    {fmtINR.format(cart.total)}
                  </dd>
                </div>
              </dl>

              <a
                href={cart.checkoutUrl}
                className="mt-5 flex items-center justify-center w-full bg-[#FFB86B] text-[#0B1020] font-bold text-sm py-3.5 rounded-xl hover:bg-[#ffa94d] transition-all duration-200 active:scale-95"
              >
                CHECKOUT SECURELY →
              </a>
              <p className="text-center text-[#8B94B8] text-[11px] mt-2.5">
                Secure checkout · UPI QR & COD
              </p>

              <div className="mt-5 pt-5 border-t border-[#1A2244]">
                <p className="text-[#C3CBE6] text-xs font-semibold tracking-wide mb-3">
                  Prefer UPI?
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/payment/paytm-qr-clean.png"
                    alt="UPI QR code for Softglow"
                    width={84}
                    height={84}
                    className="rounded-lg bg-white p-1"
                  />
                  <div className="min-w-0">
                    <p className="text-white text-sm font-semibold">{UPI_NAME}</p>
                    <button
                      onClick={copyUpi}
                      className="text-[#FFB86B] text-xs underline underline-offset-4 mt-1"
                    >
                      {copied ? "Copied!" : UPI_ID}
                    </button>
                    <a
                      href={upiLink(cart.total)}
                      className="block text-[#C3CBE6] text-xs font-semibold mt-2 hover:text-white"
                    >
                      Pay {fmtINR.format(cart.total)} in UPI app →
                    </a>
                  </div>
                </div>
                <a
                  href={whatsappLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 w-full border border-[#25D366]/40 text-[#7FE5C8] text-xs font-semibold py-2.5 rounded-xl hover:bg-[#25D366]/10 transition-colors"
                >
                  <WhatsAppIcon />
                  SEND ORDER ON WHATSAPP
                </a>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
