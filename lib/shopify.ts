const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? "";
const API_VERSION = "2025-10";

export interface OfferProduct {
  variantId: string;
  price: number;
  available: boolean;
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
