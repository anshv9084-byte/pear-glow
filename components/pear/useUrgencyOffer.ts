"use client";

import { useEffect, useState } from "react";

export const OFFER_DURATION_MS = 5 * 60 * 1000;
export const OFFER_PERCENT = 10;

const STORAGE_KEY = "pear-glow-offer-deadline";

let cachedDeadline: number | null = null;

function readDeadline() {
  if (cachedDeadline !== null) return cachedDeadline;

  const now = Date.now();
  let end = now + OFFER_DURATION_MS;

  try {
    const stored = Number(window.localStorage.getItem(STORAGE_KEY) ?? 0);
    if (Number.isFinite(stored) && stored > now) {
      end = stored;
    } else {
      window.localStorage.setItem(STORAGE_KEY, String(end));
    }
  } catch {
    // Storage unavailable — fall back to an in-memory deadline.
  }

  cachedDeadline = end;
  return end;
}

export function useUrgencyOffer() {
  const [remainingMs, setRemainingMs] = useState(OFFER_DURATION_MS);

  useEffect(() => {
    const end = readDeadline();
    const tick = () => setRemainingMs(Math.max(0, end - Date.now()));
    const frame = window.requestAnimationFrame(tick);
    const interval = window.setInterval(tick, 1000);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(interval);
    };
  }, []);

  const active = remainingMs > 0;

  return {
    active,
    remainingMs,
    percent: OFFER_PERCENT,
    discountPrice: (price: number) =>
      active ? Math.round(price * (1 - OFFER_PERCENT / 100)) : price,
  };
}

export function formatCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

const DISPATCH_CUTOFF_MINUTES = 16 * 60;

function getDispatchMessage() {
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
  const weekday = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
  }).format(now);
  const [hour, minute] = time.split(":").map(Number);
  const remaining = DISPATCH_CUTOFF_MINUTES - (hour * 60 + minute);

  if (weekday === "Sun") {
    return "Order today — dispatches Monday from our India warehouse.";
  }

  if (remaining > 240) {
    return "Same-day dispatch available — order today from our India warehouse.";
  }

  if (remaining > 0) {
    const hours = Math.floor(remaining / 60);
    const minutes = remaining % 60;
    const countdown = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    return `Order within ${countdown} for same-day dispatch from our India warehouse.`;
  }

  if (weekday === "Sat") {
    return "Order now — dispatches Monday from our India warehouse.";
  }

  return "Order now — dispatches tomorrow from our India warehouse.";
}

export function useDispatchTrigger() {
  const [message, setMessage] = useState(
    "Order today — we dispatch from our India warehouse within 1–2 business days."
  );

  useEffect(() => {
    const tick = () => setMessage(getDispatchMessage());
    const frame = window.requestAnimationFrame(tick);
    const interval = window.setInterval(tick, 60_000);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(interval);
    };
  }, []);

  return message;
}
