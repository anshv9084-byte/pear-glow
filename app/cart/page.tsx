import type { Metadata } from "next";
import CartPageView from "@/components/pear/CartPage";
import CtaFooter from "@/components/pear/CtaFooter";

export const metadata: Metadata = {
  title: "Your cart — Pear Glow",
  description: "Review your Pear Glow order and check out securely.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <>
      <CartPageView />
      <div className="bg-[#4B593B] pb-[84px] lg:pb-0">
        <CtaFooter />
      </div>
    </>
  );
}
