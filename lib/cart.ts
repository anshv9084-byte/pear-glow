const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? "";
const API_VERSION = "2025-10";

const CART_ID_KEY = "softglow_cart_id";
const CART_COUNT_KEY = "softglow_cart_count";

export const CART_EVENT = "softglow-cart";

export interface CartLine {
  id: string;
  quantity: number;
  productTitle: string;
  productHandle: string;
  variantTitle: string;
  price: number;
  lineTotal: number;
  image: string | null;
  imageAlt: string | null;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: number;
  total: number;
  currency: string;
  lines: CartLine[];
}

interface RawVariant {
  id?: string;
  title?: string;
  price?: { amount?: string };
  image?: { url?: string; altText?: string | null } | null;
  product?: { title?: string; handle?: string };
}

interface RawCart {
  id?: string;
  checkoutUrl?: string;
  totalQuantity?: number;
  cost?: {
    subtotalAmount?: { amount?: string; currencyCode?: string };
    totalAmount?: { amount?: string; currencyCode?: string };
  };
  lines?: {
    edges?: {
      node?: {
        id?: string;
        quantity?: number;
        cost?: { totalAmount?: { amount?: string } };
        merchandise?: RawVariant;
      };
    }[];
  };
}

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        cost { totalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            image { url altText }
            product { title handle }
          }
        }
      }
    }
  }
`;

async function storefront<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T | null> {
  if (!STORE_DOMAIN || !STOREFRONT_TOKEN) return null;

  try {
    const res = await fetch(`https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    });

    if (!res.ok) return null;

    const json = (await res.json()) as { data?: T | null };
    return json.data ?? null;
  } catch {
    return null;
  }
}

function parseCart(raw: RawCart | null | undefined): Cart | null {
  if (!raw?.id) return null;

  const lines: CartLine[] = (raw.lines?.edges ?? []).map((edge) => {
    const node = edge.node;
    const variant = node?.merchandise;
    return {
      id: node?.id ?? "",
      quantity: node?.quantity ?? 1,
      productTitle: variant?.product?.title ?? "Softglow",
      productHandle: variant?.product?.handle ?? "",
      variantTitle: variant?.title ?? "",
      price: Number(variant?.price?.amount ?? 0),
      lineTotal: Number(node?.cost?.totalAmount?.amount ?? 0),
      image: variant?.image?.url ?? null,
      imageAlt: variant?.image?.altText ?? null,
    };
  });

  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl ?? "",
    totalQuantity: raw.totalQuantity ?? 0,
    subtotal: Number(raw.cost?.subtotalAmount?.amount ?? 0),
    total: Number(raw.cost?.totalAmount?.amount ?? 0),
    currency: raw.cost?.totalAmount?.currencyCode ?? "INR",
    lines,
  };
}

export function getStoredCartCount(): number {
  if (typeof window === "undefined") return 0;
  return Number(window.localStorage.getItem(CART_COUNT_KEY) ?? 0) || 0;
}

function rememberCart(cart: Cart): Cart {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CART_ID_KEY, cart.id);
    window.localStorage.setItem(CART_COUNT_KEY, String(cart.totalQuantity));
    window.dispatchEvent(new Event(CART_EVENT));
  }
  return cart;
}

function forgetCart(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(CART_ID_KEY);
    window.localStorage.setItem(CART_COUNT_KEY, "0");
    window.dispatchEvent(new Event(CART_EVENT));
  }
}

function getCartId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(CART_ID_KEY);
}

export async function fetchCart(): Promise<Cart | null> {
  const cartId = getCartId();
  if (!cartId) return null;

  const data = await storefront<{ cart: RawCart | null }>(
    `query($id: ID!) { cart(id: $id) { ${CART_FIELDS} } }`,
    { id: cartId }
  );

  const cart = parseCart(data?.cart);
  if (!cart) {
    forgetCart();
    return null;
  }

  return rememberCart(cart);
}

export async function createCart(
  variantId: string,
  quantity = 1
): Promise<Cart | null> {
  const data = await storefront<{
    cartCreate: { cart: RawCart | null };
  }>(
    `mutation($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) { cart { ${CART_FIELDS} } }
    }`,
    { lines: [{ merchandiseId: variantId, quantity }] }
  );

  const cart = parseCart(data?.cartCreate?.cart);
  return cart ? rememberCart(cart) : null;
}

export async function addToCart(
  variantId: string,
  quantity = 1
): Promise<Cart | null> {
  const cartId = getCartId();

  if (!cartId) {
    return createCart(variantId, quantity);
  }

  const data = await storefront<{
    cartLinesAdd: { cart: RawCart | null };
  }>(
    `mutation($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } }
    }`,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] }
  );

  const cart = parseCart(data?.cartLinesAdd?.cart);
  if (cart) return rememberCart(cart);

  // Stale or completed cart — start a fresh one.
  forgetCart();
  return createCart(variantId, quantity);
}

export async function updateCartLine(
  lineId: string,
  quantity: number
): Promise<Cart | null> {
  const cartId = getCartId();
  if (!cartId) return null;

  if (quantity <= 0) {
    return removeCartLine(lineId);
  }

  const data = await storefront<{
    cartLinesUpdate: { cart: RawCart | null };
  }>(
    `mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } }
    }`,
    { cartId, lines: [{ id: lineId, quantity }] }
  );

  const cart = parseCart(data?.cartLinesUpdate?.cart);
  return cart ? rememberCart(cart) : null;
}

export async function removeCartLine(lineId: string): Promise<Cart | null> {
  const cartId = getCartId();
  if (!cartId) return null;

  const data = await storefront<{
    cartLinesRemove: { cart: RawCart | null };
  }>(
    `mutation($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } }
    }`,
    { cartId, lineIds: [lineId] }
  );

  const cart = parseCart(data?.cartLinesRemove?.cart);
  return cart ? rememberCart(cart) : null;
}
