"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { UPI_ID, WHATSAPP_DISPLAY, upiLink, whatsappLink } from "@/lib/site";

interface PaytmModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

const fmt = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function PaytmModal({ isOpen, onClose, amount }: PaytmModalProps) {
  const [copied, setCopied] = useState(false);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-label="Pay via UPI"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-[#121933] border border-[#1A2244] rounded-3xl p-6 sm:p-8 max-w-sm w-full max-h-[90vh] overflow-y-auto pointer-events-auto relative shadow-2xl">
              {/* Amber top line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#FFB86B] to-transparent" />

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close payment modal"
                className="absolute top-4 right-4 text-[#8B94B8] hover:text-white transition-colors p-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FFB86B]/15 rounded-2xl mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h2 className="font-heading text-2xl font-semibold text-white mb-1">
                  Pay via UPI
                </h2>
                <p className="text-[#C3CBE6] text-sm">
                  Scan the QR code or pay directly in your UPI app
                </p>
              </div>

              {/* Amount */}
              <div className="bg-[#1A2244] rounded-2xl p-4 text-center mb-6">
                <p className="text-[#C3CBE6] text-xs tracking-wider mb-1">AMOUNT TO PAY</p>
                <p className="font-heading text-4xl font-semibold text-[#FFB86B]">
                  {fmt.format(amount)}
                </p>
              </div>

              {/* QR Code */}
              <div className="bg-white rounded-2xl p-3 mx-auto w-fit mb-3">
                <Image
                  src="/assets/payment/paytm-qr-clean.png"
                  alt="UPI QR Code — scan to pay"
                  width={640}
                  height={640}
                  className="w-[200px] h-[200px] rounded-lg"
                />
              </div>

              {/* UPI ID */}
              <div className="flex items-center justify-center gap-2 mb-5">
                <p className="text-[#C3CBE6] text-xs">
                  UPI ID: <span className="text-white font-semibold">{UPI_ID}</span>
                </p>
                <button
                  onClick={copyUpiId}
                  className="text-[#FFB86B] text-xs font-bold tracking-wider hover:underline"
                >
                  {copied ? "COPIED" : "COPY"}
                </button>
              </div>

              <a
                href={upiLink(amount)}
                className="flex items-center justify-center w-full bg-[#FFB86B] text-[#0B1020] font-bold text-sm py-3 rounded-xl hover:bg-[#ffa94d] transition-colors mb-6"
              >
                PAY {fmt.format(amount)} IN UPI APP
              </a>

              {/* UPI apps */}
              <div className="text-center mb-6">
                <p className="text-[#8B94B8] text-xs tracking-wider mb-3">WORKS WITH</p>
                <div className="flex justify-center gap-4 text-[#C3CBE6] text-sm font-medium">
                  <span>Paytm</span>
                  <span>·</span>
                  <span>GPay</span>
                  <span>·</span>
                  <span>PhonePe</span>
                  <span>·</span>
                  <span>BHIM</span>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-[#FFB86B]/10 border border-[#FFB86B]/20 rounded-xl p-4">
                <p className="text-[#FFB86B] text-xs font-semibold tracking-wider mb-2">
                  AFTER PAYMENT
                </p>
                <p className="text-[#C3CBE6] text-xs leading-relaxed">
                  Share your payment screenshot + name + delivery address on WhatsApp at{" "}
                  <a
                    href={whatsappLink(
                      `Hi Softglow! I've paid ${fmt.format(amount)} via UPI. Here's my payment screenshot, name and delivery address:`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-semibold hover:text-[#FFB86B] transition-colors"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>{" "}
                  and we&apos;ll confirm your order within 1 hour.
                </p>
                <a
                  href={whatsappLink(
                    `Hi Softglow! I've paid ${fmt.format(amount)} via UPI. Here's my payment screenshot, name and delivery address:`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 w-full bg-[#25D366] text-[#0B1020] font-bold text-sm py-3 rounded-xl hover:bg-[#1fbe5a] transition-colors"
                >
                  SEND PAYMENT PROOF ON WHATSAPP
                </a>
              </div>

              {/* COD option */}
              <div className="mt-4 text-center">
                <p className="text-[#8B94B8] text-xs">
                  Prefer Cash on Delivery?{" "}
                  <a
                    href="#collection"
                    onClick={onClose}
                    className="text-[#FFB86B] hover:underline"
                  >
                    Select COD at checkout →
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
