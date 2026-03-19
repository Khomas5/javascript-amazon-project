import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart } from "../../data/cart-class.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";

describe("test suite: renderOrderSummary", () => {
  const productsId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productsId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeAll(async () => { 
    await loadProductsFetch();
  });

  beforeEach(() => {
    spyOn(localStorage, "setItem");

    document.querySelector(".js-test-container").innerHTML = `
        <div class="js-order-summary"></div> 
        <div class="js-return-to-home-link"></div>
   <div class="js-checkout-header"></div>
   <div class="js-payment-summery"></div>
   
        `;

    cart.cartItems = [
      {
        productId: productsId1,
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: productsId2,
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];

    renderOrderSummary();
  });

  it("Displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2,
    );
    expect(
      document.querySelector(`.js-product-quantity-${productsId1}`).innerText,
    ).toContain("Quantity: 2");
    expect(
      document.querySelector(`.js-product-quantity-${productsId2}`).innerText,
    ).toContain("Quantity: 1");

    document.querySelector(".js-test-container").innerHTML = "";
  });
  ////////////////////////////////////////////
  it("remove a product", () => {
    document.querySelector(`.js-delete-link-${productsId1}`).click();

    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1,
    );
    expect(
      document.querySelector(`.js-cart-item-container-${productsId1}`),
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${productsId2}`),
    ).not.toEqual(null);

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productsId2);

    document.querySelector(".js-test-container").innerHTML = "";
  });
});
