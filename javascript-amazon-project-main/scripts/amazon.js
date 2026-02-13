import { products } from "./products.js";
import { addToCart, calculateCartQuantity } from "./cart.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <img class="product-image" src="${product.image}">

      <div class="product-name">
        ${product.name}
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <button
        class="add-to-cart-button js-add-to-cart"
        data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector(".js_product").innerHTML = productsHTML;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    addToCart(productId);
    updateCartQuantity();
  });
});

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js_cart-quantity").innerText = cartQuantity;
}

updateCartQuantity();
