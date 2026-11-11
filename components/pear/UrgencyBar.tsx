"use client";

import Link from "next/link";
import { STOCK_LEFT } from "@/lib/pear-catalog";
import {
  formatCountdown,
  useDispatchTrigger,
  useUrgencyOffer,
} from "./useUrgencyOffer";

export default function UrgencyBar() {
  const { active, remainingMs, percent } = useUrgencyOffer();
  const dispatchMessage = useDispatchTrigger();

  return (
    <div className="bg-[#4F5D3D] text-[#F8F4EC]">
      <div className="mx-auto max-w-[1240px] px-5 py-2 text-center">
        {active && (
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-medium sm:text-[12px]">
            <span className="rounded-full bg-[#F8F4EC]/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#F0E8C9]">
              {percent}% off
            </span>
            <span>Limited-time offer ends in</span>
            <span className="min-w-[44px] rounded-md bg-[#F8F4EC] px-1.5 py-0.5 text-[12px] font-bold tabular-nums text-[#3F4A30]">
              {formatCountdown(remainingMs)}
            </span>
            <span className="hidden items-center gap-1.5 rounded-full bg-[#F8F4EC]/10 px-2 py-0.5 text-[9px] font-semibold text-[#F0E8C9] sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8B36A]" />
              Only {STOCK_LEFT} left
            </span>
            <Link
              href="/#buy"
              className="underline decoration-[#F8F4EC]/40 underline-offset-2 transition-colors hover:text-white"
            >
              Shop now
            </Link>
          </div>
        )}
        <p className="mt-0.5 text-[9.5px] font-medium text-[#EFEADB]/85 sm:text-[10px]">
          {dispatchMessage}
        </p>
      </div>
    </div>
  );
}
