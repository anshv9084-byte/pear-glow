import type { BundleId } from "./pear-catalog";

export interface PearCartItem {
  key: string;
  bundle: BundleId;
  name: string;
  detail: string;
  price: number;
  image: string;
  qty: number;
}

const CART_KEY = "pear_glow_cart_v1";
export const PEAR_CART_EVENT = "pear-cart-change";
export const PEAR_CART_OPEN_EVENT = "pear-cart-open";

const EMPTY_ITEMS: PearCartItem[] = [];
let cachedRaw: string | null = null;
let cachedItems: PearCartItem[] = EMPTY_ITEMS;

function readRaw(): string {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(CART_KEY) ?? "[]";
}

function parseItems(raw: string): PearCartItem[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as PearCartItem[]) : EMPTY_ITEMS;
  } catch {
    return EMPTY_ITEMS;
  }
}

export function getCartItems(): PearCartItem[] {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedItems = parseItems(raw);
  }
  return cachedItems;
}

export function getCartCount(): number {
  return getCartItems().reduce((total, item) => total + item.qty, 0);
}

export function getCartTotal(): number {
  return getCartItems().reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
}

export function subscribeCart(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => {
    cachedRaw = null;
    onChange();
  };
  window.addEventListener(PEAR_CART_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(PEAR_CART_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

function persist(items: PearCartItem[]) {
  const raw = JSON.stringify(items);
  cachedRaw = raw;
  cachedItems = items;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CART_KEY, raw);
    window.dispatchEvent(new Event(PEAR_CART_EVENT));
  }
}

export function addToPearCart(
  item: Omit<PearCartItem, "qty"> & { qty?: number }
): PearCartItem[] {
  const items = getCartItems();
  const qty = item.qty ?? 1;
  const existing = items.find((entry) => entry.key === item.key);

  const next = existing
    ? items.map((entry) =>
        entry.key === item.key ? { ...entry, qty: entry.qty + qty } : entry
      )
    : [...items, { ...item, qty }];

  persist(next);
  return next;
}

export function setPearCartQty(key: string, qty: number): PearCartItem[] {
  if (qty <= 0) return removeFromPearCart(key);
  const next = getCartItems().map((item) =>
    item.key === key ? { ...item, qty } : item
  );
  persist(next);
  return next;
}

export function removeFromPearCart(key: string): PearCartItem[] {
  const next = getCartItems().filter((item) => item.key !== key);
  persist(next);
  return next;
}

export function clearPearCart(): PearCartItem[] {
  persist([]);
  return EMPTY_ITEMS;
}

export function openCartDrawer() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(PEAR_CART_OPEN_EVENT));
  }
}
