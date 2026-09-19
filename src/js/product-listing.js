import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

const myList = new ProductList(category, dataSource, listElement);
myList.init();

// Update the title with the category
const title = document.querySelector(".products-title");
if (title && category) {
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    title.textContent = `Top Products: ${formattedCategory}`;
}