import { cart } from "../../data/cart-class.js";

export function renderCheckoutHeader() {
  let cartQuantity = 0;

  cart.cartItems.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  const checkoutHeaderHTML = `
    <div class="header-content">
        <div class="checkout-header-left-section">
          <a href="index.html">
          <span style="font-size: 24px; font-weight: bold; color: black;">Website</span>

          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link js-return-to-home-link"
            href="index.html">${cartQuantity}</a>)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>
      </div>
    
    `;
  document.querySelector(".js-checkout-header").innerHTML = checkoutHeaderHTML;
}
