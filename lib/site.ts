export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919554669084";
export const WHATSAPP_DISPLAY = "+91 95546 69084";

export const UPI_ID = "9554669084@ptyes";
export const UPI_NAME = "UMA VERMA";

export function upiLink(amount: number) {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: UPI_NAME,
    am: String(amount),
    cu: "INR",
  });
  return `upi://pay?${params.toString()}`;
}

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://softglow.in"
).replace(/\/$/, "");

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
