export let cart = JSON.parse(localStorage.getItem("cart")) || [];

saveCart();

export function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, quantity = 1) {
  const matchingItem = cart.find((item) => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity, deliveryOptionId: "1" });
  }
  
  saveCart();
}

export function removeFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  saveCart();
}

export function updateQuantity(productId, newQuantity) {
  const item = cart.find((item) => item.productId === productId);
  if (item) {
    item.quantity = newQuantity;
  }
  saveCart();
}

export function calculateCartQuantity() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const item = cart.find((item) => item.productId === productId);
  if (item) {
    item.deliveryOptionId = deliveryOptionId;
  }
  saveCart();
}

