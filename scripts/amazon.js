import { cart } from "../data/cart-class.js";
import { products, loadProducts } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let productsHTML = "";
  // accumulator pattern/ loop through the products array, using arrow function

  const url = new URL(window.location.href);
  const search = url.searchParams.get("search");

  let filteredProducts = products;

  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyWord = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLocaleLowerCase())) {
          matchingKeyWord = true;
        }
      });

      return (
        matchingKeyWord ||
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  filteredProducts.forEach((product) => {
    productsHTML += `
   <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
         ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button 
          button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
        `;
  });

  document.querySelector(".js-products-grid").innerHTML = productsHTML;
  // update cart quantity on page load
  updateCartQuantity();

  function updateCartQuantity() {
    // let cartQuantity = 0;

    // cart.cartItems.forEach((cartItem) => {
    //   cartQuantity += cartItem.quantity;
    // });
    const cartQuantity = cart.calculateCartQuantity();

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

    // updateCartQuantity();
  }

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      // Read selected quantity
      const quantitySelect = button
        .closest(".product-container")
        .querySelector("select");
      const quantity = Number(quantitySelect.value);

      cart.addToCart(productId, quantity);
      updateCartQuantity();
    });
  });

  const buttonTextTimeouts = {};

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      console.log("Button clicked!"); // Debug message 1

      const productId = button.dataset.productId;
      const container = button.closest(".product-container");
      const quantitySelect = container.querySelector("select");
      const quantity = Number(quantitySelect.value);

      console.log(`Adding Product: ${productId}, Quantity: ${quantity}`); // Debug message 2

      cart.addToCart(productId, quantity);
      updateCartQuantity();

      // --- Visual Change ---
      const originalText = button.innerHTML;

      // Change text and force styles directly
      button.innerHTML = "Added";
      button.style.backgroundColor = "white";
      button.style.color = "black";
      button.style.border = "1px solid rgb(213, 217, 217)";

      if (buttonTextTimeouts[productId]) {
        clearTimeout(buttonTextTimeouts[productId]);
      }

      const timeoutId = setTimeout(() => {
        button.innerHTML = originalText;
        // Reset styles (removing the inline styles lets CSS take over again)
        button.style.backgroundColor = "";
        button.style.color = "";
        button.style.border = "";
      }, 2000);

      buttonTextTimeouts[productId] = timeoutId;
    });
  });
}

document.querySelector(".js-search-button").addEventListener("click", () => {
  const search = document.querySelector(".js-search-bar").ariaValueMax;
  window.location.href = `index.html?search=${search}`;
});

document
  .querySelector(".js-search-bar")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const searchTerm = document.querySelector(".js-search-bar").value;
      window.location.href = `index.html?search=${searchTerm}`;
    }
  });
