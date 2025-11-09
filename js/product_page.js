/** ========= Shopify Storefront config ========= */
const { SHOP_DOMAIN, STOREFRONT_TOKEN, API_VERSION } = window.ShopifyConfig;

/** ---------- Utilities ---------- */
const qs  = (sel) => document.querySelector(sel);
const qsa = (sel) => Array.from(document.querySelectorAll(sel));
const fmtGBP = (v) => `£${Number(v).toFixed(2)}`;

// Convert Shopify GID -> numeric id string (Buy Button UI expects numeric)
function toNumericId(gidOrNum) {
  if (!gidOrNum) return null;
  const s = String(gidOrNum);
  return s.includes("/") ? s.split("/").pop() : s;
}

/** ---------- GraphQL ---------- */
async function shopifyGraphQL(query, variables = {}) {
  const res = await fetch(`https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (!res.ok || json.errors) {
    const err = json.errors ? JSON.stringify(json.errors) : await res.text();
    throw new Error(err);
  }
  return json.data;
}

const PRODUCT_BY_HANDLE = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      images(first: 10) { nodes { url altText } }
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      variants(first: 50) {
        nodes {
          id
          title
          price { amount currencyCode }
          availableForSale
          image { url altText }
        }
      }
    }
  }
`;

/** ---------- Map to your UI model ---------- */
function toDetailModel(p) {
  const imgs = p.images?.nodes?.map(n => n.url) ?? [];
  const min  = p.priceRange?.minVariantPrice;
  return {
    id: p.id,
    handle: p.handle,
    productName: p.title,
    description: p.description || "",
    price: min ? Number(min.amount) : null,
    currency: min?.currencyCode || "GBP",
    images: imgs,
    variants: (p.variants?.nodes || []).map(v => ({
      id: v.id,
      title: v.title,
      price: Number(v.price.amount),
      available: !!v.availableForSale,
      image: v.image?.url || null
    }))
  };
}

/** ---------- Render (show only existing images; photoOne = original) ---------- */
function renderImages(model) {
  const imgs = (model.images || []).filter(Boolean);
  const big  = document.getElementById("bigImg");
  const ids  = ["photoOne", "photoTwo", "photoThree", "photoFour"];

  // Set the main image to the first real image
  if (big) big.src = imgs[0] || "";

  // Set each thumb to its matching image (hide if missing)
  ids.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (imgs[i]) {
      el.src = imgs[i];
      el.dataset.index = String(i);   // remember which image it represents
      el.style.display = "";          // show
    } else {
      el.removeAttribute("src");
      el.style.display = "none";      // hide if not present
      el.removeAttribute("data-index");
    }
  });

  // mark first thumb active
  setActiveThumb(0);
}

/** ---------- Click to swap big image; click photoOne to restore ---------- */
function wireImageInteractions() {
  const big = document.getElementById("bigImg");
  const close = document.getElementsByClassName("product-close")[0];
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("img01");

  // delegate clicks from the container (works even if some thumbs are hidden)
  document.addEventListener("click", (e) => {
    const thumb = e.target.closest(".small-img");
    if (!thumb || !big || !thumb.src) return;
    big.src = thumb.src;
    const idx = Number(thumb.dataset.index || 0);
    setActiveThumb(idx);              // update highlight
  });

  // modal behavior (unchanged)
  if (big && modal && modalImg) {
    big.onclick = () => { modal.style.display = "block"; modalImg.src = big.src; };
  }
  if (close && modal) {
    close.onclick = () => { modal.style.display = "none"; };
    window.addEventListener("click", (ev) => { if (ev.target == modal) modal.style.display = "none"; });
  }
}

/** ---------- Visual active state for the selected thumb ---------- */
function setActiveThumb(activeIdx) {
  ["photoOne","photoTwo","photoThree","photoFour"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el || el.style.display === "none") return;
    el.classList.toggle("is-active", Number(el.dataset.index) === activeIdx);
  });
}



function renderText(model) {
  const titleEl = qs(".sl-title");
  const priceEl = document.getElementById("slPriceLabel");
  const descEls = qsa(".sl-paragraph");
  if (titleEl) titleEl.textContent = model.productName || "Product";
  if (priceEl)  priceEl.textContent = model.price != null ? fmtGBP(model.price) : "£—";
  if (descEls.length > 0) {
    descEls[0].textContent = model.description || "Beautifully crafted sofa with premium comfort and durable upholstery.";
  }
}

/** ---------- Image swap & modal ---------- */
function wireImageInteractions() {
  const big = document.getElementById("bigImg");
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("img01");
  const close = document.getElementsByClassName("product-close")[0];

  qsa(".small-img").forEach(img =>
    img.addEventListener("click", function(){ if (big) big.src = this.src; })
  );
  if (big && modal && modalImg) {
    big.onclick = () => { modal.style.display = "block"; modalImg.src = big.src; };
  }
  if (close && modal) {
    close.style.cursor = "pointer";
    close.onclick = () => { modal.style.display = "none"; };
    window.addEventListener("click", (ev) => { if (ev.target == modal) modal.style.display = "none"; });
  }
}

/** ---------- Buy Button UI: cart + product (button only) ---------- */
let slClient;
let slUI;
let slCartComponent;
let slProductComponent;

function sdkReady() {
  if (!window.ShopifyBuy || !ShopifyBuy.UI) {
    throw new Error("Shopify Buy Button SDK not loaded. Use buy-button-storefront.min.js and include it before this file.");
  }
}

function getClient() {
  sdkReady();
  if (slClient) return slClient;
  slClient = ShopifyBuy.buildClient({
    domain: SHOP_DOMAIN,
    storefrontAccessToken: STOREFRONT_TOKEN,
  });
  return slClient;
}

function uiReady() {
  const client = getClient();
  return ShopifyBuy.UI.onReady(client).then(ui => {
    slUI = ui;
    return ui;
  });
}

// Mount a product component that renders ONLY a button, styled like your button
async function mountBuyButtonFor(productGid) {
  // await mountCart(); // ensure cart exists (the UI usually opens it after add)
  const host = document.getElementById("slBuyButtonHost");
  if (!host) return;

  // Destroy previous product component if any (navigating between products on same page)
  try { slProductComponent?.destroy?.(); } catch {}

  slProductComponent = await slUI.createComponent("product", {
    id: toNumericId(productGid),   // numeric id string
    node: host,
    moneyFormat: "%C2%A3%7B%7Bamount%7D%7D",
    options: {
      product: {
        layout: "vertical",
        // render ONLY the button; hide everything else
        contents: {
          img: false,
          imgWithCarousel: false,
          title: false,
          price: false,
          options: false,
          quantityInput: false,
          description: false
        },
        buttonDestination: "cart", // add to cart (side panel)
        text: { button: "Add to Cart" },
        styles: {
          product: { "margin": "0", "width": "100%" },
          button: {
            "background": "#78b657",       // ← your colour
            "color": "#ffffff",
            "width": "100%",
            "border": "none",
            "border-radius": "12px",
            "padding": "12px 14px",
            "font-weight": "800",
            // states
            ":hover": { "background": "#1c5a31" },
            ":focus": { "background": "#1c5a31" },
            ":disabled": { "background": "#9fb8a7" }
          }
        }
      },
      cart: {
        popup: false,
        styles: { button: { "border-radius": "12px" } },
        text: { total: "Subtotal", button: "Checkout" }
      },
      modalProduct: {
        contents: { img: false, imgWithCarousel: true, buttonWithQuantity: true },
        styles: {
          product: { "@media (min-width: 601px)": { "max-width": "100%", "margin-left": "0", "margin-bottom": "0" } },
          button: { "border-radius": "12px" }
        },
        text: { button: "Add to cart" }
      }
    }
  });

  // After render, make sure the internal button matches your container styling
  // (slBuyButtonHost already has .sl-actions, but this is extra polish)
  host.classList.add("sl-actions");
}

/** ---------- Load current product & mount UI button ---------- */
async function loadProductDetail() {
  // 1) Fast render from localStorage
  const handle = localStorage.getItem("productHandle");
  const list   = JSON.parse(localStorage.getItem("productList") || "[]");
  const idx    = Number(localStorage.getItem("productIndex") || "-1");

  let optimistic = null;
  const pickLocal = (p) => p && ({
    id: p.id || null,
    handle: p.handle,
    productName: p.productName,
    description: p.description || "",
    price: p.price ? Number(p.price) : null,
    currency: p.currency || "GBP",
    images: [p.photoOne, p.photoTwo, p.photoThree, p.photoFour].filter(Boolean),
    variants: p.variants || [],
  });

  if (idx > -1 && list[idx]) optimistic = pickLocal(list[idx]);
  else if (handle && list.length) optimistic = pickLocal(list.find(x => x.handle === handle));

  if (optimistic) {
    renderImages(optimistic);
    renderText(optimistic);
    window.__currentProduct = optimistic;
  }

  // 2) Fresh fetch
  try {
    const chosenHandle = handle || (optimistic && optimistic.handle);
    if (!chosenHandle) throw new Error("No product handle in localStorage.");
    const data  = await shopifyGraphQL(PRODUCT_BY_HANDLE, { handle: chosenHandle });
    if (!data.product) throw new Error("Product not found.");
    const model = toDetailModel(data.product);

    renderImages(model);
    renderText(model);
    window.__currentProduct = model;

    // Mount the Buy Button UI for THIS product (button only; cart drawer opens on add)
    await mountBuyButtonFor(model.id);
  } catch (e) {
    console.warn("Storefront fetch failed:", e);
    if (!optimistic) {
      const titleEl = qs(".sl-title");
      const priceEl = document.getElementById("slPriceLabel");
      if (titleEl) titleEl.textContent = "Product unavailable";
      if (priceEl) priceEl.textContent = "£—";
    }
  }
}

/** ---------- Init ---------- */
window.addEventListener("load", async () => {
  try {
    wireImageInteractions();
    await uiReady();       // ensure Buy Button UI is ready
    await loadProductDetail();
  } catch (e) {
    console.error(e);
  }
});
