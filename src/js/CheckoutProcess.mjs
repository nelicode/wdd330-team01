import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
    constructor() {
        this.cart = getLocalStorage("so-cart") || [];
        this.services = new ExternalServices();
    }

    calculateSubtotal() {
        return this.cart.reduce((total, item) => {
            return total + item.FinalPrice;
        }, 0);
    }

    calculateTax() {
        const subtotal = this.calculateSubtotal();
        return subtotal * 0.06;
    }

    calculateShipping() {
        if (this.cart.length === 0) {
            return 0;
        }

        return 10 + (this.cart.length - 1) * 2;
    }

    calculateOrderTotal() {
        return (
            this.calculateSubtotal() +
            this.calculateTax() +
            this.calculateShipping()
        );
    }

    packageItems() {
        return this.cart.map((item) => ({
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: 1,
        }));
    }

    async checkout(form) {
        const formData = new FormData(form);
        const order = Object.fromEntries(formData);

        order.orderDate = new Date().toISOString();
        order.items = this.packageItems();
        order.orderTotal = this.calculateOrderTotal();
        order.shipping = this.calculateShipping();
        order.tax = this.calculateTax();

        try {
            const response = await this.services.checkout(order);
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}



