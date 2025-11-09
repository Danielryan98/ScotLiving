const { SHOP_DOMAIN, STOREFRONT_TOKEN, API_VERSION } = window.ShopifyConfig;

async function getProduct(handle) {
  const res = await fetch(`https://${shop}/api/2025-10/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? {"X-Shopify-Storefront-Access-Token": token} : {})
    },
    body: JSON.stringify({
      query: /* GraphQL */ `
        query GetProduct($handle: String!) {
          product(handle: $handle) {
            title
            images(first: 10) { edges { node { url altText } } }
            variants(first: 50) { edges { node { title price { amount currencyCode } image { url altText } } } }
          }
        }`,
      variables: { handle }
    })
  });
  const { data } = await res.json();
  const p = data.product;
  return {
    title: p.title,
    images: p.images.edges.map(e => e.node.url),
    variants: p.variants.edges.map(e => ({
      title: e.node.title,
      price: `${e.node.price.amount} ${e.node.price.currencyCode}`,
      image: e.node.image?.url ?? null
    }))
  };
}
