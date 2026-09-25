import { loadHeaderFooter, setLocalStorage } from "./utils.mjs";
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
            const response = await checkout.checkout(form);

            setLocalStorage("so-cart", []);
            window.location.href = "/checkout/success.html";
        } catch (err) {
            alert(`Error: ${err.message.cardNumber}`);
        }
    });

loadHeaderFooter();
