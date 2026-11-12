"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  removeFromPearCart,
  setPearCartQty,
  clearPearCart,
} from "@/lib/pear-cart";
import { fmtPrice } from "@/lib/pear-catalog";
import { UPI_ID, upiLink, whatsappLink } from "@/lib/site";
import CartDrawer from "./CartDrawer";
import Header from "./Header";
import { usePearCart } from "./usePearCart";
import {
  CheckIcon,
  CloseIcon,
  FOOTER_PAYMENTS,
  PaymentMarks,
  PearMark,
  WhatsAppIcon,
} from "./Common";

export default function CartPage() {
  const items = usePearCart();
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod">("upi");
  const list = items ?? [];
  const count = list.reduce((sum, item) => sum + item.qty, 0);
  const total = list.reduce((sum, item) => sum + item.price * item.qty, 0);

  function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const address = String(data.get("address") ?? "").trim();
    const pincode = String(data.get("pincode") ?? "").trim();

    const lines = list
      .map(
        (item) =>
          `- ${item.name} (${item.detail}) x${item.qty} — ${fmtPrice(
            item.price * item.qty
          )}`
      )
      .join("\n");

    const message = [
      "Hi Pear Glow! I'd like to place an order.",
      "",
      lines,
      "",
      `Total: ${fmtPrice(total)}`,
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Address: ${address}`,
      `Pincode: ${pincode}`,
      "",
      `Payment method: ${
        paymentMethod === "upi"
          ? "UPI QR code (Paytm)"
          : "Cash on Delivery (COD)"
      }`,
      "",
      "Please confirm my order.",
    ].join("\n");

    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");

    void fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: list.map((item) => ({
          key: item.key,
          name: item.name,
          detail: item.detail,
          qty: item.qty,
          price: item.price,
        })),
        customer: { name, phone, address, pincode },
        payment: paymentMethod,
      }),
      keepalive: true,
    }).catch(() => {});
  }

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#23271C]">
      <Header />
      <CartDrawer />

      <main className="mx-auto max-w-[1120px] px-5 pb-32 pt-8 lg:px-8 lg:pb-20 lg:pt-12">
        <nav className="flex items-center gap-2 text-[12px] text-[#8A8779]">
          <Link href="/" className="transition-colors hover:text-[#23271C]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#4F5246]">Cart</span>
        </nav>

        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-[32px] font-semibold tracking-[-0.03em] sm:text-[38px]">
              Your cart
            </h1>
            <p className="mt-1 text-[13px] text-[#777567]">
              {count === 0
                ? "Nothing here yet — your bedtime friend is waiting."
                : `${count} ${count === 1 ? "item" : "items"} ready for a softer night.`}
            </p>
          </div>
          <Link
            href="/#buy"
            className="text-[12.5px] font-medium text-[#6E6D62] underline decoration-[#BDB6A4] underline-offset-4 transition-colors hover:text-[#23271C]"
          >
            Continue shopping
          </Link>
        </div>

        {items === null ? (
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
            <div className="h-[320px] animate-pulse rounded-[24px] border border-[#2B3022]/8 bg-[#F3EEE2]" />
            <div className="h-[420px] animate-pulse rounded-[24px] border border-[#2B3022]/8 bg-[#F3EEE2]" />
          </div>
        ) : list.length === 0 ? (
          <div className="mt-8 flex flex-col items-center rounded-[26px] border border-[#2B3022]/10 bg-[#FBF8F1] px-6 py-16 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EFE8D8]">
              <PearMark className="h-10 w-9 text-[#C9A84C]" />
            </span>
            <h2 className="mt-6 text-[20px] font-semibold">
              Your cart is feeling a little empty
            </h2>
            <p className="mt-2 max-w-[360px] text-[13.5px] leading-relaxed text-[#777567]">
              Pick a squishy, color-changing friend and turn bedtime into
              something to look forward to.
            </p>
            <Link
              href="/#buy"
              className="mt-6 rounded-full bg-[#C9A84C] px-7 py-3.5 text-[13.5px] font-semibold text-[#211D0E] transition-colors hover:bg-[#B9973E]"
            >
              Shop the lamp
            </Link>
            <PaymentMarks ids={FOOTER_PAYMENTS} className="mt-7 justify-center" />
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
            <section className="rounded-[24px] border border-[#2B3022]/10 bg-[#FBF8F1] px-4 sm:px-6">
              <ul className="divide-y divide-[#2B3022]/8">
                {list.map((item) => (
                  <li key={item.key} className="flex gap-4 py-5 sm:gap-5">
                    <div className="relative h-[92px] w-[82px] shrink-0 overflow-hidden rounded-xl bg-[#EFE8D8] sm:h-[108px] sm:w-[96px]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-[14px] font-semibold leading-snug sm:text-[15px]">
                            {item.name}
                          </h2>
                          <p className="mt-1 text-[11.5px] text-[#777567]">
                            {item.detail}
                          </p>
                          <p className="mt-1 inline-flex items-center gap-1 text-[10.5px] font-medium text-[#5C7145]">
                            <CheckIcon className="h-3 w-3" /> In stock
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromPearCart(item.key)}
                          aria-label={`Remove ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-[#9A9789] transition-colors hover:bg-[#F0E9DA] hover:text-[#8A3B2E]"
                        >
                          <CloseIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex h-9 items-center rounded-full border border-[#2B3022]/15 bg-white/50">
                          <button
                            type="button"
                            onClick={() =>
                              setPearCartQty(item.key, item.qty - 1)
                            }
                            aria-label="Decrease quantity"
                            className="flex h-9 w-9 items-center justify-center text-[16px] text-[#4F5246] transition-colors hover:text-[#23271C]"
                          >
                            &minus;
                          </button>
                          <span className="w-7 text-center text-[12.5px] font-semibold">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setPearCartQty(item.key, item.qty + 1)
                            }
                            aria-label="Increase quantity"
                            className="flex h-9 w-9 items-center justify-center text-[16px] text-[#4F5246] transition-colors hover:text-[#23271C]"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-[14px] font-semibold">
                            {fmtPrice(item.price * item.qty)}
                          </p>
                          {item.qty > 1 && (
                            <p className="text-[10.5px] text-[#9A9789]">
                              {fmtPrice(item.price)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => clearPearCart()}
                className="mb-4 text-[11.5px] font-medium text-[#9A9789] underline decoration-[#C9C3B4] underline-offset-4 transition-colors hover:text-[#8A3B2E]"
              >
                Clear cart
              </button>
            </section>

            <aside className="h-fit rounded-[24px] border border-[#2B3022]/10 bg-[#FBF8F1] p-5 sm:p-6 lg:sticky lg:top-[90px]">
              <h2 className="text-[18px] font-semibold">Order summary</h2>
              <dl className="mt-4 space-y-2.5 border-b border-[#2B3022]/10 pb-4 text-[13px]">
                <div className="flex items-center justify-between">
                  <dt className="text-[#777567]">Subtotal</dt>
                  <dd className="font-medium">{fmtPrice(total)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[#777567]">Shipping</dt>
                  <dd className="font-medium text-[#5C7145]">Free</dd>
                </div>
              </dl>
              <div className="flex items-center justify-between py-4">
                <span className="text-[14px] font-semibold">Total</span>
                <span className="text-[22px] font-semibold tracking-[-0.02em]">
                  {fmtPrice(total)}
                </span>
              </div>

              <form id="order-form" onSubmit={handleCheckout} className="space-y-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A7A2E]">
                  Delivery details
                </p>
                <Field name="name" placeholder="Full name" autoComplete="name" />
                <Field
                  name="phone"
                  placeholder="Phone number"
                  type="tel"
                  autoComplete="tel"
                />
                <Field
                  name="address"
                  placeholder="Full address"
                  autoComplete="street-address"
                />
                <Field
                  name="pincode"
                  placeholder="Pincode"
                  inputMode="numeric"
                  autoComplete="postal-code"
                />
                <p className="pt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A7A2E]">
                  Payment method
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <PaymentOption
                    label="UPI QR"
                    hint="Paytm or any UPI app"
                    selected={paymentMethod === "upi"}
                    onSelect={() => setPaymentMethod("upi")}
                  />
                  <PaymentOption
                    label="Cash on Delivery"
                    hint="No prepayment · pay at your door"
                    selected={paymentMethod === "cod"}
                    onSelect={() => setPaymentMethod("cod")}
                  />
                </div>
                <p className="flex items-start gap-1.5 rounded-lg bg-[#EDF0E4]/70 px-2.5 py-2 text-[10px] leading-snug text-[#5C7145]">
                  <CheckIcon className="mt-[1px] h-3 w-3 shrink-0" />
                  Cash on Delivery available across India — pay only when your
                  lamp arrives.
                </p>
                {paymentMethod === "upi" && (
                  <div className="rounded-xl border border-[#2B3022]/12 bg-white/55 p-3.5 text-center">
                    <p className="text-[10.5px] font-medium text-[#777567]">
                      Scan with Paytm or any UPI app to pay{" "}
                      {fmtPrice(total)}
                    </p>
                    <div className="mx-auto mt-2 w-fit rounded-lg bg-white p-2 shadow-sm">
                      <Image
                        src="/assets/payment/paytm-qr-clean.png"
                        alt="Paytm UPI QR code"
                        width={640}
                        height={640}
                        className="h-[168px] w-[168px] rounded"
                      />
                    </div>
                    <p className="mt-2 text-[10.5px] text-[#8A8779]">
                      UPI ID:{" "}
                      <span className="font-semibold text-[#3D4034]">
                        {UPI_ID}
                      </span>
                    </p>
                    <p className="mt-1 text-[10.5px] leading-relaxed text-[#8A8779]">
                      After paying, send the screenshot on WhatsApp with your
                      order details.
                    </p>
                    <a
                      href={upiLink(total)}
                      className="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#4F5D3D] px-4 py-2.5 text-[11.5px] font-semibold text-[#F8F4EC] transition-colors hover:bg-[#455234]"
                    >
                      <CheckIcon className="h-3.5 w-3.5" />
                      Pay {fmtPrice(total)} in your UPI app
                    </a>
                    <p className="mt-1.5 text-[9.5px] leading-relaxed text-[#9A9789]">
                      On your phone? Tap above to open Paytm, GPay or any UPI
                      app directly.
                    </p>
                  </div>
                )}
                <button
                  type="submit"
                  className="mt-1 flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-[#4F5D3D] text-[14px] font-semibold text-[#F8F4EC] transition-all hover:-translate-y-0.5 hover:bg-[#455234] active:translate-y-0"
                >
                  <WhatsAppIcon className="h-[18px] w-[18px]" />
                  Checkout via WhatsApp
                </button>
              </form>

              <div className="mt-3 rounded-xl border border-[#2B3022]/10 bg-[#F5EFE2]/70 px-3.5 py-3">
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#8A7A2E]">
                  What happens next
                </p>
                <ol className="mt-1.5 space-y-1 text-[10.5px] leading-snug text-[#6E6D62]">
                  <li className="flex gap-2">
                    <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#8A7A2E]/15 text-[8.5px] font-bold text-[#6B5F24]">
                      1
                    </span>
                    WhatsApp opens with your order details filled in.
                  </li>
                  <li className="flex gap-2">
                    <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#8A7A2E]/15 text-[8.5px] font-bold text-[#6B5F24]">
                      2
                    </span>
                    We confirm your address and dispatch in 1&ndash;2 days.
                  </li>
                  <li className="flex gap-2">
                    <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#8A7A2E]/15 text-[8.5px] font-bold text-[#6B5F24]">
                      3
                    </span>
                    Pay now via UPI QR, or choose Cash on Delivery.
                  </li>
                </ol>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[#2B3022]/10 pt-4">
                {["Secure checkout", "Free shipping", "7-day replacement"].map(
                  (label) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1 text-center"
                    >
                      <CheckIcon className="h-3.5 w-3.5 text-[#5C7145]" />
                      <span className="text-[9.5px] font-medium leading-tight text-[#777567]">
                        {label}
                      </span>
                    </div>
                  )
                )}
              </div>
              <PaymentMarks ids={FOOTER_PAYMENTS} className="mt-3 justify-center" />
            </aside>
          </div>
        )}
        {list.length > 0 && (
          <div
            className="fixed inset-x-0 bottom-0 z-50 border-t border-[#2B3022]/10 bg-[#FBF8F1]/95 px-4 pt-3 backdrop-blur-md lg:hidden"
            style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
          >
            <div className="mx-auto flex max-w-[1120px] items-center gap-3">
              <div className="shrink-0">
                <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-[#8A8779]">
                  Total
                </p>
                <p className="text-[17px] font-semibold leading-tight text-[#23271C]">
                  {fmtPrice(total)}
                </p>
              </div>
              <button
                type="submit"
                form="order-form"
                className="ml-auto flex h-[46px] flex-1 items-center justify-center gap-2 rounded-full bg-[#4F5D3D] text-[12.5px] font-semibold text-[#F8F4EC] active:bg-[#455234]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Checkout via WhatsApp
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function PaymentOption({
  label,
  hint,
  selected,
  onSelect,
}: {
  label: string;
  hint: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${
        selected
          ? "border-[#8A7A2E] bg-[#FAF6E8] ring-1 ring-[#8A7A2E]"
          : "border-[#2B3022]/14 bg-white/55 hover:border-[#8A7A2E]/50"
      }`}
    >
      <span className="flex items-center gap-2 text-[12px] font-semibold text-[#2C3024]">
        <span
          className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
            selected
              ? "border-[#8A7A2E] bg-[#8A7A2E] text-white"
              : "border-[#BDB7A7] bg-white text-transparent"
          }`}
          aria-hidden="true"
        >
          <CheckIcon className="h-2.5 w-2.5" />
        </span>
        {label}
      </span>
      <span className="mt-0.5 block pl-[22px] text-[10px] text-[#8A8779]">
        {hint}
      </span>
    </button>
  );
}

function Field({
  name,
  placeholder,
  type = "text",
  autoComplete,
  inputMode,
}: {
  name: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "text" | "tel";
}) {
  return (
    <input
      name={name}
      type={type}
      required
      placeholder={placeholder}
      autoComplete={autoComplete}
      inputMode={inputMode}
      className="h-[44px] w-full rounded-xl border border-[#2B3022]/14 bg-white/55 px-3.5 text-[12.5px] text-[#23271C] outline-none transition-colors placeholder:text-[#9A9789] hover:border-[#8A7A2E]/50 focus:border-[#8A7A2E] focus:ring-2 focus:ring-[#8A7A2E]/15"
    />
  );
}
