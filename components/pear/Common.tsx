import Link from "next/link";

export function Stars({
  value = 5,
  size = 15,
  className = "",
}: {
  value?: number;
  size?: number;
  className?: string;
}) {
  const stars = Array.from({ length: 5 });
  return (
    <span
      className={`relative inline-flex shrink-0 ${className}`}
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      <span className="flex gap-0.5 text-[#DCCDAC]">
        {stars.map((_, i) => (
          <StarGlyph key={i} size={size} />
        ))}
      </span>
      <span
        className="absolute left-0 top-0 flex gap-0.5 overflow-hidden text-[#B9701F]"
        style={{ width: `${(value / 5) * 100}%` }}
        aria-hidden="true"
      >
        {stars.map((_, i) => (
          <StarGlyph key={i} size={size} />
        ))}
      </span>
    </span>
  );
}

function StarGlyph({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.3l6.5-.9L12 2.5Z" />
    </svg>
  );
}

export function PearMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M14.2 9.4c-6.1 0-10.6 5.2-10.6 11.7 0 6.2 4.4 9.9 10.6 9.9s10.6-3.7 10.6-9.9c0-6.5-4.5-11.7-10.6-11.7Z"
        fill="currentColor"
      />
      <path
        d="M14.2 10.2c.5-3.2.3-5.5-.3-7.4"
        stroke="#7B6734"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M14.4 6.8c3-2.7 6.1-3.5 8.9-3.2-.5 2.9-3.3 5.3-8.9 3.2Z"
        fill="#7F914F"
      />
    </svg>
  );
}

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5">
      <PearMark
        className={`h-8 w-7 transition-transform duration-300 group-hover:-rotate-6 ${
          dark ? "text-[#E9D7A4]" : "text-[#C9A84C]"
        }`}
      />
      <span
        className={`text-[22px] font-semibold tracking-[-0.02em] ${
          dark ? "text-[#F8F4EC]" : "text-[#2B3022]"
        }`}
      >
        Pear{" "}
        <span className={dark ? "text-[#DBC68C]" : "text-[#8A7A2E]"}>Glow</span>
      </span>
    </Link>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8A7A2E] ${className}`}
    >
      {children}
    </p>
  );
}

export type PaymentId = "upi-qr" | "cod";

export const HERO_PAYMENTS: PaymentId[] = ["upi-qr", "cod"];

export const FOOTER_PAYMENTS: PaymentId[] = ["upi-qr", "cod"];

export function PaymentMarks({
  ids,
  className = "",
}: {
  ids: PaymentId[];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {ids.map((id) => (
        <PaymentMark key={id} id={id} />
      ))}
    </div>
  );
}

function PaymentMark({ id }: { id: PaymentId }) {
  const inner =
    id === "upi-qr" ? (
      <span className="flex items-center gap-1" aria-label="Pay via UPI QR code">
        <svg
          viewBox="0 0 24 24"
          className="h-3 w-3 text-[#23271C]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M4 9V5.5A1.5 1.5 0 0 1 5.5 4H9M15 4h3.5A1.5 1.5 0 0 1 20 5.5V9M20 15v3.5a1.5 1.5 0 0 1-1.5 1.5H15M9 20H5.5A1.5 1.5 0 0 1 4 18.5V15" />
          <path d="M8 8h2v2H8zM14 8h2v2h-2zM8 14h2v2H8zM14 14h2v2h-2z" />
        </svg>
        <span className="text-[9px] font-bold tracking-[0.02em] text-[#23271C]">
          UPI QR
        </span>
      </span>
    ) : (
      <span className="text-[9px] font-bold tracking-[0.02em] text-[#23271C]">
        Cash on Delivery
      </span>
    );

  return (
    <span className="inline-flex h-6 min-w-[38px] items-center justify-center rounded-[4px] bg-white px-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
      {inner}
    </span>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function BagIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Z" />
    </svg>
  );
}

export function FeatureIcon({ name }: { name: "usb" | "heart" | "star" | "touch" }) {
  const paths: Record<string, React.ReactNode> = {
    usb: (
      <>
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    star: (
      <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.3l6.5-.9L12 2.5Z" />
    ),
    touch: (
      <>
        <path d="M9 11V6a2 2 0 1 1 4 0v5" />
        <path d="M13 11V9a2 2 0 1 1 4 0v5" />
        <path d="M17 14v-1a2 2 0 1 1 4 0v4a6 6 0 0 1-6 6h-2a6 6 0 0 1-5.2-3L5 15.5a2 2 0 0 1 3.2-2.4L9 14" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
