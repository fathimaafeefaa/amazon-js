import {
  cart,
  removeFromCart,
  updateQuantity,
  updateDeliveryOption,
} from "./cart.js";
import { products } from "./products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm";
import { deliveryOptions } from "./delivery-options.js";

function getDeliveryDate(deliveryDays) {
  return dayjs().add(deliveryDays, "day").format("dddd, MMMM D");
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

function renderCheckout() {
  let summaryHTML = "";

  cart.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);

    // const deliveryOption = deliveryOptions.find(
    //   (option) => option.id === cartItem.deliveryOptionId,
    // );

    // const deliveryDate = getDeliveryDate(deliveryOption.deliveryDays);
    let deliveryOption = deliveryOptions.find(
      (option) => option.id === cartItem.deliveryOptionId,
    );

    // If no delivery option found, use default
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

function addEventListeners() {
  // DELETE
  document.querySelectorAll(".delete-link").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      removeFromCart(productId);
      renderCheckout();
    });
  });

  // QUANTITY CHANGE
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", () => {
      const productId = input.dataset.productId;
      const newQuantity = Number(input.value);
   updateQuantity(productId, newQuantity);
   updateItemSubtotal(productId);
   updatePaymentSummary();

    });
  });

  // DELIVERY OPTION CHANGE  ✅ FIXED LOCATION
  document.querySelectorAll(".delivery-option-input").forEach((radio) => {
    radio.addEventListener("change", () => {
      const productId = radio.dataset.productId;
      const deliveryOptionId = radio.dataset.deliveryOptionId;

   updateDeliveryOption(productId, deliveryOptionId);
   updatePaymentSummary();

    });
  });
}

function updatePaymentSummary() {
  let itemsTotal = 0;
  let shippingTotal = 0;

  cart.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);

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

  document.querySelector(".payment-summary").innerHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cart.length}):</div>
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

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;
}

renderCheckout();

function updateItemSubtotal(productId) {
  const cartItem = cart.find((item) => item.productId === productId);
  const product = products.find((p) => p.id === productId);

  const subtotalElement = document.querySelector(`.js-subtotal-${productId}`);

  if (subtotalElement) {
    subtotalElement.innerHTML = `$${formatCurrency(product.priceCents * cartItem.quantity)}`;
  }
}

