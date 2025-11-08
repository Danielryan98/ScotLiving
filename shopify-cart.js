/* ============================================
   Shopify Cart Helper (shopify-cart.js)
   - Shared checkout across pages via localStorage
   - Add by product handle OR variantId
   - No redirect on add; stays on page
   - Optional cart-count badge update
   ============================================ */

/** ====== CONFIG: set your store + token ====== */
var SHOPIFY_DOMAIN = 'ew1p0e-te.myshopify.com';
var STOREFRONT_TOKEN = '5a8d7121ceec1c23a9770b01f2d0f745';
var CHECKOUT_ID_KEY = 'shopifyCheckoutId';

/** ====== Simple cart badge (optional) ======
 *  Add this somewhere in your nav if you want:
 *  <span id="cart-count"
 *    style="display:none;margin-left:6px;padding:0 8px;border-radius:10px;
 *           background:#226C3B;color:#fff;font-size:12px;line-height:20px;"></span>
 */
function setCartCount(n) {
  var el = document.getElementById('cart-count');
  if (!el) return;
  el.textContent = n;
  el.style.display = n > 0 ? 'inline-block' : 'none';
}

/** ====== Guard: ensure SDK present ====== */
if (typeof ShopifyBuy === 'undefined' || !ShopifyBuy.buildClient) {
  console.error('[shopify-cart] Missing Shopify Buy SDK. Include it before this file:\n' +
                '<script src="https://sdks.shopifycdn.com/js-buy-sdk/v2/latest/index.umd.min.js"></script>');
}

/** ====== Build client ====== */
var shopifyClient = ShopifyBuy.buildClient({
  domain: SHOPIFY_DOMAIN,
  storefrontAccessToken: STOREFRONT_TOKEN
});

/** ====== Checkout helpers ====== */
function createCheckout() {
  return shopifyClient.checkout.create().then(function(chk) {
    localStorage.setItem(CHECKOUT_ID_KEY, chk.id);
    return chk;
  });
}

function fetchCheckout(checkoutId) {
  return shopifyClient.checkout.fetch(checkoutId);
}

function ensureCheckout() {
  var id = localStorage.getItem(CHECKOUT_ID_KEY);
  if (!id) return createCheckout();
  return fetchCheckout(id).then(function(chk) {
    if (chk && !chk.completedAt) return chk;
    localStorage.removeItem(CHECKOUT_ID_KEY);
    return createCheckout();
  }).catch(function() {
    localStorage.removeItem(CHECKOUT_ID_KEY);
    return createCheckout();
  });
}

function totalQty(checkout) {
  try {
    return checkout.lineItems.reduce(function(sum, li) { return sum + li.quantity; }, 0);
  } catch (e) { return 0; }
}

/** ====== Public: addToCart({handle, variantId, quantity}) ====== */
function addToCart(opts) {
  opts = opts || {};
  var variantId = opts.variantId || null;
  var handle = opts.handle || null;
  var quantity = parseInt(opts.quantity || 1, 10);

  return ensureCheckout().then(function(chk) {
    if (variantId) {
      return shopifyClient.checkout.addLineItems(chk.id, [{
        variantId: variantId,
        quantity: quantity
      }]).then(function(updated) {
        setCartCount(totalQty(updated));
        return updated;
      });
    }
    if (handle) {
      return shopifyClient.product.fetchByHandle(handle).then(function(prod) {
        var v = (prod.variants || []).find(function(x) { return x.available; }) || prod.variants[0];
        if (!v) throw new Error('No variant found for handle: ' + handle);
        return shopifyClient.checkout.addLineItems(chk.id, [{
          variantId: v.id,
          quantity: quantity
        }]).then(function(updated) {
          setCartCount(totalQty(updated));
          return updated;
        });
      });
    }
    return Promise.reject(new Error('addToCart: provide handle or variantId'));
  });
}

/** ====== Public: getCheckoutUrl() → Promise<string> ====== */
function getCheckoutUrl() {
  return ensureCheckout().then(function(chk) { return chk.webUrl; });
}

/** ====== Public: openCheckout() → Promise<void> ====== */
function openCheckout() {
  return getCheckoutUrl().then(function(url) { window.location.href = url; });
}

/** ====== Event delegation for any .add-to-cart button ======
 *  Buttons can use:
 *    data-handle="product-handle"
 *    OR data-variant-id="gid://shopify/ProductVariant/123..."
 *    optional data-qty="2"
 */
document.addEventListener('click', function(e) {
  var btn = e.target.closest('.add-to-cart');
  if (!btn) return;

  e.preventDefault();
  var handle = btn.getAttribute('data-handle');
  var variantId = btn.getAttribute('data-variant-id');
  var qty = parseInt(btn.getAttribute('data-qty') || '1', 10);

  var original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="fa fa-check"></i> Added';

  addToCart({ handle: handle, variantId: variantId, quantity: qty })
    .catch(function(err) {
      console.error('[shopify-cart] addToCart failed:', err);
      alert('Sorry — could not add to basket.');
      btn.innerHTML = original;
    })
    .finally(function() {
      btn.disabled = false;
      setTimeout(function() { btn.innerHTML = original; }, 1200);
    });
});

/** ====== On load: ensure a checkout & restore count ====== */
ensureCheckout().then(function(chk) { setCartCount(totalQty(chk)); });

/** ====== Expose a tiny API on window (optional) ====== */
window.ShopCart = {
  addToCart: addToCart,
  openCheckout: openCheckout,
  getCheckoutUrl: getCheckoutUrl,
  ensureCheckout: ensureCheckout
};
