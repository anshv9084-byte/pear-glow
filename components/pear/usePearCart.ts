"use client";

import { useSyncExternalStore } from "react";
import {
  getCartItems,
  subscribeCart,
  type PearCartItem,
} from "@/lib/pear-cart";

export function usePearCart(): PearCartItem[] | null {
  return useSyncExternalStore<PearCartItem[] | null>(
    subscribeCart,
    getCartItems,
    () => null
  );
}
