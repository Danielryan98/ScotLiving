const { SHOP_DOMAIN, STOREFRONT_TOKEN, API_VERSION } = window.ShopifyConfig;

/** GraphQL helper */
async function shopifyGraphQL(query, variables = {}) {
  const res = await fetch(
    `https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }
  );
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Shopify error ${res.status}: ${msg}`);
  }
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors, null, 2));
  return json.data;
}

/** Query all products with pagination.
 *  - Grab title, handle, first 5 images, price range, first 5 variants
 *  - If you want *collection* products only, use the collection query shown below.
 */
const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($first: Int!, $after: String) {
    products(first: $first, after: $after, sortKey: TITLE) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        handle
        title
        images(first: 5) {
          nodes {
            url
            altText
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 5) {
          nodes {
            title
            price {
              amount
              currencyCode
            }
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
`;

// Optional: by collection handle
const COLLECTION_PRODUCTS_QUERY = /* GraphQL */ `
  query CollectionProducts($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      products(first: $first, after: $after, sortKey: TITLE) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          handle
          title
          images(first: 5) {
            nodes {
              url
              altText
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 5) {
            nodes {
              title
              price {
                amount
                currencyCode
              }
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

/** Pull *all* pages */
async function fetchAllProducts({
  byCollectionHandle = null,
  pageSize = 100,
} = {}) {
  let products = [];
  let after = null;
  while (true) {
    const data = byCollectionHandle
      ? await shopifyGraphQL(COLLECTION_PRODUCTS_QUERY, {
          handle: byCollectionHandle,
          first: pageSize,
          after,
        })
      : await shopifyGraphQL(PRODUCTS_QUERY, { first: pageSize, after });

    const connection = byCollectionHandle
      ? data.collection?.products
      : data.products;
    if (!connection) break;

    products = products.concat(connection.nodes);
    if (!connection.pageInfo.hasNextPage) break;
    after = connection.pageInfo.endCursor;
  }
  return products;
}

/** Convert Shopify product → your UI model */
function toCardModel(p) {
  const imgs = p.images?.nodes?.map((n) => n.url) ?? [];
  const price = p.priceRange?.minVariantPrice ?? null;
  const formattedPrice = price ? `${Number(price.amount).toFixed(2)}` : "—";
  return {
    productName: p.title,
    price: formattedPrice, // numeric string; prefix "£" when rendering
    currency: price?.currencyCode ?? "GBP",
    inCart: 0,
    handle: p.handle,
    cataloguePhoto: imgs[0] || "Pictures/placeholder.jpg",
    photoOne: imgs[0] || null,
    photoTwo: imgs[1] || null,
    photoThree: imgs[2] || null,
    photoFour: imgs[3] || null,
    _raw: p,
  };
}

/** Render to #app exactly like your template */
function renderCards(models) {
  const html = models
    .map(
      (sofa, idx) => `
    <div class="card" data-index="${idx}" style="width:463px;margin:auto;">
      <div class="product-img-container" style="height:315px;">
        <a href="javascript:void(0);" class="product-link" data-index="${idx}">
          <img class="product-photo" style="width:100%;height:100%;object-fit:cover;"
               src="${sofa.cataloguePhoto}" alt="${sofa.productName}">
        </a>
      </div>
      <div class="card-body">
        <p class="card-title">${sofa.productName}</p>
        <p class="product-price">£${sofa.price}</p>
      </div>
    </div>
  `
    )
    .join("");

  const app = document.getElementById("app");
  app.innerHTML = html;

  const checks = app.querySelectorAll(".product-photo");
  checks.forEach((img) =>
    img.addEventListener("click", (event) => {
      const index = Array.from(checks).indexOf(event.target);
      // Save both index and product handle for detail page
      localStorage.setItem("productIndex", index);
      localStorage.setItem("productHandle", models[index].handle);
      window.open("product.html", "_self");
    })
  );
}

/** Boot */
(async function init() {
  try {
    // If you want a specific collection: fetchAllProducts({ byCollectionHandle: "fabric-sofas" })
    const shopifyProducts = await fetchAllProducts();
    const models = shopifyProducts.map(toCardModel);

    // Keep a copy for your product detail page to read (optional)
    localStorage.setItem("productList", JSON.stringify(models));

    renderCards(models);
  } catch (err) {
    console.error(err);
    document.getElementById("app").innerHTML = `
      <div style="padding:1rem;color:#b00020;">Failed to load products. Check your Storefront token, domain, and CORS.</div>`;
  }
})();

/** Cart */

(function () {
  var client = ShopifyBuy.buildClient({
    domain: SHOP_DOMAIN,
    storefrontAccessToken: STOREFRONT_TOKEN,
  });

  var ui = ShopifyBuy.UI.init(client);

  ui.createComponent("cart", {
    node: document.getElementById("my-cart"), // optional
    options: {
      cart: {
        startOpen: false,
        popup: false,
      },
      toggle: {
        contents: { title: false },
      },
    },
  });
})();
