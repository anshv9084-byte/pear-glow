"use client";
import { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "THE LAMP", href: "#lamp" },
  { label: "WHY SOFTGLOW", href: "#why" },
  { label: "REVIEWS", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

const CART_EVENT = "softglow-cart";

function subscribeCart(onChange: () => void) {
  window.addEventListener(CART_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CART_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getCartCount() {
  return Number(window.localStorage.getItem("softglow_cart_count") ?? 0) || 0;
}

function CartBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#FFB86B] text-[#0B1020] text-[10px] font-bold flex items-center justify-center">
      {count}
    </span>
  );
}

const CartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useSyncExternalStore(subscribeCart, getCartCount, () => 0);
  const pathname = usePathname();

  const sectionHref = (hash: string) =>
    pathname === "/" ? hash : `/${hash}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-[#0B1020]/80 border-b border-white/5 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-1.5 group">
            <span
              className="w-2.5 h-2.5 rounded-full bg-[#FFB86B] shadow-[0_0_8px_#FFB86B] lamp-glow"
              aria-hidden="true"
            />
            <span className="font-heading text-xl font-semibold tracking-widest text-white group-hover:text-[#FFB86B] transition-colors">
              SOFTGLOW
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={sectionHref(l.href)}
                className="text-[#DDE3F5] hover:text-[#FFB86B] text-sm font-medium tracking-wider transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/cart"
              aria-label={`Cart with ${cartCount} items`}
              className="relative text-[#C3CBE6] hover:text-white transition-colors p-2"
            >
              <CartIcon />
              <CartBadge count={cartCount} />
            </Link>
            <a
              href={sectionHref("#collection")}
              className="bg-[#FFB86B] text-[#0B1020] font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-[#ffa94d] transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,184,107,0.5)] active:scale-95"
            >
              SHOP NOW
            </a>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/cart"
              aria-label={`Cart with ${cartCount} items`}
              className="relative text-[#C3CBE6] p-2"
            >
              <CartIcon />
              <CartBadge count={cartCount} />
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="text-white p-2"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0B1020] flex flex-col items-center justify-center gap-10"
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={sectionHref(l.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="font-heading text-4xl font-semibold text-white hover:text-[#FFB86B] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href={sectionHref("#collection")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.08 }}
              className="mt-4 bg-[#FFB86B] text-[#0B1020] font-bold text-lg px-8 py-3 rounded-full"
              onClick={() => setMenuOpen(false)}
            >
              SHOP NOW
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
