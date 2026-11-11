"use client";

const DARK_ITEMS = [
  "FREE SHIPPING ACROSS INDIA",
  "CASH ON DELIVERY AVAILABLE",
  "7 COLOR MODES",
  "SAFE BPA-FREE SILICONE",
  "EASY 7-DAY REPLACEMENT",
  "USB RECHARGEABLE",
  "TOUCH CONTROL",
];

const AMBER_ITEMS = [
  "FREE SHIPPING ACROSS INDIA",
  "CASH ON DELIVERY AVAILABLE",
  "7 COLOR MODES",
  "SAFE BPA-FREE SILICONE",
  "EASY 7-DAY REPLACEMENT",
  "USB RECHARGEABLE",
  "TOUCH CONTROL",
];

interface MarqueeBannerProps {
  variant?: "dark" | "amber";
}

export default function MarqueeBanner({ variant = "dark" }: MarqueeBannerProps) {
  const items = variant === "amber" ? AMBER_ITEMS : DARK_ITEMS;
  const doubled = [...items, ...items];

  const isAmber = variant === "amber";

  return (
    <div
      className={`overflow-hidden py-3 ${
        isAmber ? "bg-[#FFB86B]" : "bg-[#0B1020] border-y border-[#1A2244]"
      }`}
      aria-hidden="true"
    >
      <div
        className="marquee-track"
        style={{ animationDuration: "24s" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`flex items-center gap-2 text-xs font-semibold tracking-[0.18em] whitespace-nowrap px-6 ${
              isAmber ? "text-[#0B1020]" : "text-[#C3CBE6]"
            }`}
          >
            {item}
            <span className={`text-base ${isAmber ? "text-[#0B1020]/50" : "text-[#FFB86B]"}`}>
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
