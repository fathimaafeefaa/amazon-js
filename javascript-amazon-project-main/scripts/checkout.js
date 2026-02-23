import {
  cart,
  removeFromCart,
  updateQuantity,
  updateDeliveryOption,
  loadCart,
} from "./cart.js";

import { products, loadProducts } from "./products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm";
import { deliveryOptions } from "./delivery-options.js";

async function loadPage() {
  try {
    await loadProducts();
    const value = await loadCart();
  } catch (error) {
    console.log("unexpected error");
  }

  renderCheckout();
}
loadPage().then((value) => {
  console.log("next step");
  console.log(value);
});

// Promise.all([loadProducts(), new Promise((resolve) => loadCart(resolve))]).then(
//   () => {
//     renderCheckout();
//   },
// );

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve();
//   });
// })
//   .then(() => {
//     return new Promise((resolve) => {
//       loadCart(() => {
//         resolve();
//       });
//     });
//   })
//   .then(() => {

//   });

// loadProducts(() => {
//     loadCart (()=>{
//  renderCheckout();
//     })

// });

function getDeliveryDate(deliveryDays) {
  return dayjs().add(deliveryDays, "day").format("dddd, MMMM D");
}

function renderCheckout() {
  let summaryHTML = "";

  if (!products.length) {
    console.log("Products not loaded yet.");
    return;
  }

  cart.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);

    if (!product) {
      console.error("Product not found for:", cartItem.productId);
      return;
    }

    let deliveryOption = deliveryOptions.find(
      (option) => option.id === cartItem.deliveryOptionId,
    );

    if (!deliveryOption) {
      deliveryOption = deliveryOptions[0];
    }

    const deliveryDate = getDeliveryDate(deliveryOption.deliveryDays);

    summaryHTML += `
      <div class="cart-item-container">
        <div class="delivery-date">
          Delivery date: ${deliveryDate}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${product.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${product.name}
            </div>
           
            <div class="product-price">
              $${formatCurrency(product.priceCents)}
            </div>

            <div class="product-subtotal">
              Subtotal:
              <span class="js-subtotal-${product.id}">
                $${formatCurrency(product.priceCents * cartItem.quantity)}
              </span>
            </div>

            <div class="product-quantity">
              Quantity:
              <input type="number" min="1"
                value="${cartItem.quantity}"
                class="quantity-input"
                data-product-id="${product.id}">
              
              <span class="delete-link link-primary"
                data-product-id="${product.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${generateDeliveryOptionsHTML(cartItem)}
          </div>

        </div>
      </div>
    `;
  });

  document.querySelector(".js_order_summary").innerHTML = summaryHTML;

  addEventListeners();
  updatePaymentSummary();
}

function generateDeliveryOptionsHTML(cartItem) {
  let html = "";

  deliveryOptions.forEach((option) => {
    const dateString = getDeliveryDate(option.deliveryDays);
    const isChecked = option.id === cartItem.deliveryOptionId ? "checked" : "";

    html += `
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          data-product-id="${cartItem.productId}"
          data-delivery-option-id="${option.id}"
          name="delivery-option-${cartItem.productId}"
          ${isChecked}
        >
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${
              option.priceCents === 0
                ? "FREE Shipping"
                : `$${formatCurrency(option.priceCents)} - Shipping`
            }
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

function addEventListeners() {
  document.querySelectorAll(".delete-link").forEach((button) => {
    button.addEventListener("click", () => {
      removeFromCart(button.dataset.productId);
      renderCheckout();
    });
  });

  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", () => {
      const productId = input.dataset.productId;
      const newQuantity = Number(input.value);

      updateQuantity(productId, newQuantity);
      renderCheckout();
    });
  });

  document.querySelectorAll(".delivery-option-input").forEach((radio) => {
    radio.addEventListener("change", () => {
      updateDeliveryOption(
        radio.dataset.productId,
        radio.dataset.deliveryOptionId,
      );
      renderCheckout();
    });
  });
}

function updatePaymentSummary() {
  let itemsTotal = 0;
  let shippingTotal = 0;

  cart.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);

    if (!product) return;

    itemsTotal += product.priceCents * cartItem.quantity;

    const deliveryOption = deliveryOptions.find(
      (option) => option.id === cartItem.deliveryOptionId,
    );

    if (deliveryOption) {
      shippingTotal += deliveryOption.priceCents;
    }
  });

  const totalBeforeTax = itemsTotal + shippingTotal;
  const tax = Math.round(totalBeforeTax * 0.1);
  const total = totalBeforeTax + tax;
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  document.querySelector(".payment-summary").innerHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
<div>Items (${totalItems}):</div>      
<div class="payment-summary-money">
        $${formatCurrency(itemsTotal)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping & handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shippingTotal)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTax)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(tax)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(total)}
      </div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order  
    </button>
  `;

  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      const response = await fetch("https://supersimplebackend.dev/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cart,
        }),
      });
     const order = await response.json();

     if (order.errorMessage) {
       alert(order.errorMessage);
       return;
     }
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders.unshift(order);
      localStorage.setItem("orders", JSON.stringify(orders));
      cart.length = 0;
      localStorage.setItem("cart", JSON.stringify([]));
      window.location.href = "orders.html";
      console.log("Sending cart:", cart);
    });
}
