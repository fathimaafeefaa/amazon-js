import { products, loadProducts } from "./products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm";
import { calculateCartQuantity } from "./cart.js";

const orders = JSON.parse(localStorage.getItem("orders")) || [];

async function init() {
  await loadProducts();
  renderOrders();
  updateCartQuantity();
}

function updateCartQuantity() {
  const quantity = calculateCartQuantity();
  document.querySelector(".js-cart-quantity").innerText = quantity;
}

function renderOrders() {
  const container = document.querySelector(".js-orders-grid");

  if (!orders.length) {
    container.innerHTML = "<h2>No orders placed yet.</h2>";
    return;
  }

  let html = "";

  orders.forEach((order) => {
    if (!order.id || !order.products) return;
    const orderDate = dayjs(order.orderTime).format("MMMM D");
    const total = order.totalCostCents;

    html += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div>
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDate}</div>
            </div>
            <div>
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(total)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${generateProductsHTML(order)}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  attachBuyAgainEvents(); // attach AFTER rendering
}

function generateProductsHTML(order) {
  let html = "";

  order.products.forEach((orderedProduct) => {
    const product = products.find((p) => p.id === orderedProduct.productId);

    if (!product) return;

    const deliveryDate = dayjs(order.orderTime).add(5, "day").format("MMMM D");

    html += `
      <div class="product-image-container">
        <img src="${product.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${deliveryDate}
        </div>
        <div class="product-quantity">
          Quantity: ${orderedProduct.quantity}
        </div>
      </div>

      <div class="product-actions">
        <button class="buy-again-button button-primary"
          data-product-id="${product.id}">
          Buy it again
        </button>
      </div>
    `;
  });

  return html;
}

function attachBuyAgainEvents() {
  document.querySelectorAll(".buy-again-button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find((item) => item.productId === productId);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          productId,
          quantity: 1,
          deliveryOptionId: "1",
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "checkout.html";
    });
  });
}

init(); 
