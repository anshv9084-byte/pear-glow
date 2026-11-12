const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? "";
const API_VERSION = "2025-10";

export interface OfferProduct {
  variantId: string;
  price: number;
  available: boolean;
}

export interface PearShopifyVariantPricing {
  price: number;
  available: boolean;
}

export interface PearShopifyPricing {
  single: PearShopifyVariantPricing;
  duo: PearShopifyVariantPricing;
  variants: Record<string, PearShopifyVariantPricing>;
}

const PEAR_VARIANT_IDS: Record<string, string> = {
  Pink: "baby-unicorn",
  Mint: "mint-bunny",
  Yellow: "sunny-bear",
  Lavender: "lavender-lamb",
};

interface ShopifyProductNode {
  availableForSale?: boolean;
  variants?: {
    edges?: {
      node?: {
        title?: string;
        availableForSale?: boolean;
        price?: { amount?: string };
      };
    }[];
  };
}

export async function getPearPricing(): Promise<PearShopifyPricing | null> {
  if (!STORE_DOMAIN || !STOREFRONT_TOKEN) return null;

  const query = `query {
    single: product(handle: "pear-glow-night-lamp") {
      availableForSale
      variants(first: 10) {
        edges { node { title availableForSale price { amount } } }
      }
    }
    duo: product(handle: "pear-glow-duo") {
      availableForSale
      variants(first: 10) {
        edges { node { title availableForSale price { amount } } }
      }
    }
  }`;

  try {
    const res = await fetch(`https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json = (await res.json()) as {
      data?: {
        single?: ShopifyProductNode | null;
        duo?: ShopifyProductNode | null;
      };
    };

    const single = json.data?.single;
    const duo = json.data?.duo;
    if (!single || !duo) return null;

    const singleVariants = single.variants?.edges ?? [];
    const duoVariant = duo.variants?.edges?.[0]?.node;
    if (singleVariants.length === 0 || !duoVariant) return null;

    const singlePrice = Math.min(
      ...singleVariants.map((edge) => Number(edge.node?.price?.amount ?? 0))
    );
    const duoPrice = Number(duoVariant.price?.amount ?? 0);
    if (!Number.isFinite(singlePrice) || !Number.isFinite(duoPrice)) return null;

    const variants: Record<string, PearShopifyVariantPricing> = {};
    for (const edge of singleVariants) {
      const node = edge.node;
      const id = node?.title ? PEAR_VARIANT_IDS[node.title] : undefined;
      if (!node || !id) continue;
      variants[id] = {
        price: Number(node.price?.amount ?? 0),
        available: Boolean(node.availableForSale),
      };
    }

    return {
      single: {
        price: singlePrice,
        available: Boolean(single.availableForSale),
      },
      duo: {
        price: duoPrice,
        available: Boolean(duo.availableForSale),
      },
      variants,
    };
  } catch {
    return null;
  }
}

export async function getOfferProducts(
  handles: string[]
): Promise<Record<string, OfferProduct>> {
  if (!STORE_DOMAIN || !STOREFRONT_TOKEN || handles.length === 0) return {};

  const selections = handles
    .map(
      (handle, index) =>
        `p${index}: product(handle: ${JSON.stringify(handle)}) {
          handle
          variants(first: 1) {
            edges { node { id price { amount } availableForSale } }
          }
        }`
    )
    .join("\n");

  try {
    const res = await fetch(`https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query: `query {\n${selections}\n}` }),
      next: { revalidate: 60 },
    });

    if (!res.ok) return {};

    const json = (await res.json()) as {
      data?: Record<
        string,
        | {
            handle?: string;
            variants?: {
              edges?: {
                node?: {
                  id?: string;
                  price?: { amount?: string };
                  availableForSale?: boolean;
                };
              }[];
            };
          }
        | null
      >;
    };

    const products: Record<string, OfferProduct> = {};

    for (const node of Object.values(json.data ?? {})) {
      const variant = node?.variants?.edges?.[0]?.node;
      if (node?.handle && variant?.id) {
        products[node.handle] = {
          variantId: variant.id,
          price: Number(variant.price?.amount ?? 0),
          available: Boolean(variant.availableForSale),
        };
      }
    }

    return products;
  } catch {
    return {};
  }
}
