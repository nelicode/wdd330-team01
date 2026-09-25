import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import ExternalServices from "./ExternalServices.mjs";
const services = new ExternalServices();

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

        const form = event.target;
        const order = await checkout.checkout(form);

        const response = await services.checkout(order);

        alert(`${response.message}! Your order number is ${response.orderId}.`);
    });

loadHeaderFooter();
