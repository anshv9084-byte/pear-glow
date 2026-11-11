"use client";

import Link from "next/link";
import { BagIcon, Logo } from "./Common";
import UrgencyBar from "./UrgencyBar";
import { openCartDrawer } from "@/lib/pear-cart";
import { usePearCart } from "./usePearCart";

const NAV = [
  { label: "Shop", href: "/#buy" },
  { label: "Our Story", href: "/#story" },
  { label: "FAQs", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const items = usePearCart();
  const count = (items ?? []).reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-[#2B3022]/8 bg-[#F8F4EC]/92 backdrop-blur-md">
      <UrgencyBar />
      <div className="mx-auto flex h-[66px] max-w-[1240px] items-center justify-between gap-4 px-5 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13.5px] font-medium text-[#4F5246] transition-colors hover:text-[#23271C]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={openCartDrawer}
          aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#2B3022]/10 bg-white/50 text-[#2B3022] transition-colors hover:bg-white"
        >
          <BagIcon className="h-[17px] w-[17px]" />
          <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#8A7A2E] px-1 text-[9.5px] font-bold text-[#F8F4EC]">
            {count}
          </span>
        </button>
      </div>
    </header>
  );
}
