document.addEventListener("DOMContentLoaded", () => {
  /** ====== Config ====== */
  const { SHOP_DOMAIN, STOREFRONT_TOKEN, API_VERSION } = window.ShopifyConfig || {};
  if (!SHOP_DOMAIN || !STOREFRONT_TOKEN || !API_VERSION) {
    console.error("Missing ShopifyConfig (SHOP_DOMAIN / STOREFRONT_TOKEN / API_VERSION).");
    const app = document.getElementById("app");
    if (app) app.innerHTML = `<div class="col-12 text-danger">Missing Shopify config.</div>`;
    return;
  }

  /** ====== Utilities ====== */

  function getCategoryFromUrl() {
    const params = new URLSearchParams(location.search);
    return (params.get("c") || "").toLowerCase();
  }

  /** ====== GraphQL helper ====== */
  async function shopifyGraphQL(query, variables = {}) {
    const res = await fetch(`https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    const text = await res.text();
    let json = null;
    try { json = JSON.parse(text); } catch { /* not JSON */ }

    if (!res.ok) throw new Error(`Shopify ${res.status}: ${text}`);
    if (json?.errors) throw new Error(JSON.stringify(json.errors));
    return json.data;
  }

  /** ====== Products search (no collections) ====== */
  // Use Shopify's product search "query:" parameter (supports product_type:, tag:, vendor:, etc.)
  const PRODUCTS_SEARCH_QUERY = /* GraphQL */ `
    query ProductsSearch($first: Int!, $after: String, $q: String) {
      products(first: $first, after: $after, query: $q, sortKey: TITLE) {
        pageInfo { hasNextPage endCursor }
        nodes {
          id
          handle
          title
          images(first: 5) { nodes { url altText } }
          priceRange { minVariantPrice { amount currencyCode } }
          variants(first: 5) {
            nodes { title price { amount currencyCode } image { url altText } }
          }
        }
      }
    }
  `;

  // Map your nav tabs to a product search query
  // ✅ Product type version (recommended: set product_type in Admin → Products)
  const CATEGORY_TO_QUERY = {
    frames:     `product_type:'Frames'`,
    mattresses: `product_type:'Mattresses'`,
    divans:     `product_type:'Divans'`,
  };

  // If you prefer tags instead, use this mapping instead:
  // const CATEGORY_TO_QUERY = {
  //   frames:     `tag:'frames'`,
  //   mattresses: `tag:'mattresses'`,
  //   divans:     `tag:'divans'`,
  // };

  async function fetchAllProductsByQuery(q, pageSize = 100) {
    let items = [];
    let after = null;
    while (true) {
      const vars = { first: pageSize, after };
      if (q) vars.q = q;
      const data = await shopifyGraphQL(PRODUCTS_SEARCH_QUERY, vars);
      const conn = data.products;
      if (!conn) break;
      items = items.concat(conn.nodes);
      if (!conn.pageInfo.hasNextPage) break;
      after = conn.pageInfo.endCursor;
    }
    return items;
  }

  async function fetchProductsForCategory(cat) {
    const q = CATEGORY_TO_QUERY[cat];
    // If no mapping for the tab, fallback to ALL products
    return await fetchAllProductsByQuery(q);
  }

  /** ====== Transform + Render ====== */
  function toCardModel(p) {
    const imgs  = p.images?.nodes?.map(n => n.url) ?? [];
    const price = p.priceRange?.minVariantPrice ?? null;
    const priceStr = price ? Number(price.amount).toFixed(2) : "—";
    return {
      productName: p.title,
      price: priceStr,
      currency: price?.currencyCode ?? "GBP",
      handle: p.handle,
      cataloguePhoto: imgs[0] || "Pictures/placeholder.jpg",
      photoOne: imgs[0] || null,
      photoTwo: imgs[1] || null,
      photoThree: imgs[2] || null,
      photoFour: imgs[3] || null,
      _raw: p,
    };
  }

  function renderCards(models) {
    const app = document.getElementById("app");
    if (!app) {
      console.error("#app not found.");
      return;
    }
    if (!models.length) {
      app.innerHTML = `<div class="col-12">No products in this category yet.</div>`;
      return;
    }

    // Build rows of cards
    const html = models.map((m, idx) => `

    <div class="card" data-index="${idx}" style="width:463px;margin:auto;">
      <div class="product-img-container" style="height:315px;">
        <a href="javascript:void(0);" class="product-link" data-index="${idx}">
          <img class="product-photo" style="width:100%;height:100%;object-fit:cover;"
               src="${m.cataloguePhoto}" alt="${m.productName}">
        </a>
      </div>
      <div class="card-body">
        <p class="card-title">${m.productName}</p>
        <p class="product-price">£${m.price}</p>
      </div>
    </div>
  `
    )
    .join("");

    app.innerHTML = html;

    // Click → save index + handle and go to product page
    const photos = app.querySelectorAll(".product-photo");
    photos.forEach((imgEl) => {
      imgEl.addEventListener("click", (e) => {
        const all = Array.from(photos);
        const index = all.indexOf(e.target);
        localStorage.setItem("productIndex", index);
        localStorage.setItem("productHandle", models[index].handle);
        window.open("product.html", "_self");
      });
    });
  }

  /** ====== Boot ====== */
  (async function initCatalogue() {
    try {
      const cat = getCategoryFromUrl() || "frames"; // default tab/category

      const products = await fetchProductsForCategory(cat);
      const models   = products.map(toCardModel);

      // persist for product page
      localStorage.setItem("productList", JSON.stringify(models));

      renderCards(models);

      const titleEl = document.getElementById("catalogue-title");
      if (titleEl) titleEl.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    } catch (err) {
      console.error(err);
      const app = document.getElementById("app");
      if (app) {
        app.innerHTML = `<div class="col-12 text-danger">
          Failed to load ${getCategoryFromUrl() || "products"}:<br>
          <code>${(err && err.message) || err}</code>
        </div>`;
      }
    }
  })();

  /** ====== Optional: mount a Buy Button cart on this page ====== */
  (function initCartIfSdkPresent() {
    if (!window.ShopifyBuy || !ShopifyBuy.UI) {
      // SDK not loaded — that’s okay, we’re not required to show a cart here.
      return;
    }
    const client = ShopifyBuy.buildClient({
      domain: SHOP_DOMAIN,
      storefrontAccessToken: STOREFRONT_TOKEN,
    });
    const ui = ShopifyBuy.UI.init(client);
    const node = document.getElementById("my-cart") || document.body;
    ui.createComponent("cart", {
      node,
      options: {
        cart: { startOpen: false, popup: false },
        toggle: { contents: { title: false } },
      },
    });
  })();
});
