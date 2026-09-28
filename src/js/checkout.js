import { loadHeaderFooter, setLocalStorage, alertMessage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess();

const subtotal = checkout.calculateSubtotal();
document.querySelector("#subtotal").textContent = subtotal.toFixed(2);

const tax = checkout.calculateTax();
document.querySelector("#tax").textContent = tax.toFixed(2);

const shipping = checkout.calculateShipping();
document.querySelector("#shipping").textContent = shipping.toFixed(2);

const orderTotal = checkout.calculateOrderTotal();
document.querySelector("#order-total").textContent = orderTotal.toFixed(2);

document
  .querySelector("#checkout-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const form = event.target;
      await checkout.checkout(form);

      setLocalStorage("so-cart", []);
      window.location.href = "/checkout/success.html";
    } catch (err) {
      let message = "There was a problem placing your order.";

      if (err.message && typeof err.message === "object") {
        message = Object.values(err.message).join("<br>");
      } else if (err.message) {
        message = err.message;
      }

      alertMessage(message);
    }
  });

loadHeaderFooter();