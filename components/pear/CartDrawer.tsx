"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  PEAR_CART_OPEN_EVENT,
  removeFromPearCart,
  setPearCartQty,
} from "@/lib/pear-cart";
import { fmtPrice } from "@/lib/pear-catalog";
import { usePearCart } from "./usePearCart";
import {
  CheckIcon,
  CloseIcon,
  PearMark,
  type PaymentId,
  PaymentMarks,
} from "./Common";

const DRAWER_PAYMENTS: PaymentId[] = ["upi-qr", "cod"];

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const items = usePearCart() ?? [];

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener(PEAR_CART_OPEN_EVENT, openHandler);
    return () => {
      window.removeEventListener(PEAR_CART_OPEN_EVENT, openHandler);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div
      className={open ? "fixed inset-0 z-[60]" : "pointer-events-none fixed inset-0 z-[60]"}
      aria-hidden={!open}
      inert={!open}
    >
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Close cart"
        tabIndex={open ? 0 : -1}
        className={`absolute inset-0 bg-[#20241B]/45 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[432px] flex-col bg-[#FBF8F1] shadow-[-16px_0_60px_rgba(32,36,27,0.18)] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#2B3022]/10 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <h2 className="text-[17px] font-semibold text-[#23271C]">
              Your cart
            </h2>
            <span className="rounded-full bg-[#EDE6D6] px-2 py-0.5 text-[11px] font-semibold text-[#5C5B4D]">
              {count} {count === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#4F5246] transition-colors hover:bg-[#EDE6D6] hover:text-[#23271C]"
          >
            <CloseIcon className="h-[18px] w-[18px]" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFE8D8]">
              <PearMark className="h-8 w-7 text-[#C9A84C]" />
            </span>
            <p className="mt-5 text-[17px] font-semibold text-[#23271C]">
              Your cart is feeling a little empty
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-[#6E6D62]">
              Add a squishy bedtime friend and make nights a little softer.
            </p>
            <Link
              href="/#buy"
              onClick={() => setOpen(false)}
              className="mt-6 rounded-full bg-[#C9A84C] px-6 py-3 text-[13.5px] font-semibold text-[#211D0E] transition-colors hover:bg-[#B9973E]"
            >
              Find your lamp
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 border-b border-[#2B3022]/8 bg-[#F3ECDD] px-5 py-2.5 text-[12px] font-medium text-[#4F5D3D]">
              <CheckIcon className="h-3.5 w-3.5" />
              Free shipping &amp; secure checkout included
            </div>

            <ul className="flex-1 divide-y divide-[#2B3022]/8 overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item.key} className="flex gap-3.5 py-5">
                  <Link
                    href="/#buy"
                    onClick={() => setOpen(false)}
                    className="relative h-[86px] w-[76px] shrink-0 overflow-hidden rounded-xl bg-[#EFE8D8]"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="76px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[13.5px] font-semibold leading-snug text-[#23271C]">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-[11.5px] text-[#6E6D62]">
                          {item.detail}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromPearCart(item.key)}
                        aria-label={`Remove ${item.name}`}
                        className="text-[#9A9789] transition-colors hover:text-[#8A3B2E]"
                      >
                        <CloseIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex h-8 items-center rounded-full border border-[#2B3022]/15">
                        <button
                          type="button"
                          onClick={() =>
                            setPearCartQty(item.key, item.qty - 1)
                          }
                          aria-label="Decrease quantity"
                          className="flex h-8 w-8 items-center justify-center text-[15px] text-[#4F5246] transition-colors hover:text-[#23271C]"
                        >
                          &minus;
                        </button>
                        <span className="w-6 text-center text-[12px] font-semibold text-[#23271C]">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setPearCartQty(item.key, item.qty + 1)
                          }
                          aria-label="Increase quantity"
                          className="flex h-8 w-8 items-center justify-center text-[15px] text-[#4F5246] transition-colors hover:text-[#23271C]"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-[13px] font-semibold text-[#23271C]">
                        {fmtPrice(item.price * item.qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-[#2B3022]/10 bg-[#FBF8F1] px-5 pb-5 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#5C5B4D]">
                  Subtotal
                </span>
                <span className="text-[17px] font-semibold text-[#23271C]">
                  {fmtPrice(total)}
                </span>
              </div>
              <p className="mt-1 text-[11.5px] text-[#8A8779]">
                Shipping &amp; taxes calculated at checkout.
              </p>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="mt-4 flex h-[50px] w-full items-center justify-center rounded-full bg-[#C9A84C] text-[14px] font-semibold text-[#211D0E] transition-colors hover:bg-[#B9973E]"
              >
                Checkout
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-2.5 w-full text-center text-[12px] font-medium text-[#6E6D62] underline decoration-[#B9B2A0] underline-offset-4 transition-colors hover:text-[#23271C]"
              >
                Continue shopping
              </button>
              <PaymentMarks
                ids={DRAWER_PAYMENTS}
                className="mt-3.5 justify-center opacity-90"
              />
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
