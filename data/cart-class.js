export class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, quantity) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: "1",
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(
      (item) => item.productId !== productId
    );

    this.saveToStorage();
  }

  calculateCartQuantity() {
    let total = 0;

    this.cartItems.forEach((item) => {
      total += item.quantity;
    });

    return total;
  }

  updateQuantity(productId, newQuantity) {
    let matchinItem;

     this.cartItems.forEach((cartItem) => { 
     if(productId === cartItem.productId){
      matchinItem = cartItem;
     }
     });

    if (matchinItem) {
      matchinItem.quantity = newQuantity;
      this.saveToStorage();
    }
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const item = this.cartItems.find(
      (cartItem) => cartItem.productId === productId
    );

    if (item) {
      item.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    }
  }

  // ✅ FIXED VERSION
  resetCart() {
    this.cartItems = [];
    this.saveToStorage();
  }

  // ✅ OPTIONAL (from cart.js idea)
  loadCartFetch = async () => {
    const response = await fetch("https://supersimplebackend.dev/cart");
    return await response.text();
  };
}

// ✅ SINGLE SOURCE OF TRUTH
export const cart = new Cart("cart");