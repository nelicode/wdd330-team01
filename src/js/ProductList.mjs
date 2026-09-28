import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  let discountIndicator = "";

  if (product.SuggestedRetailPrice && product.FinalPrice < product.SuggestedRetailPrice) {
    const discountPercent = Math.round(
      ((product.SuggestedRetailPrice - product.FinalPrice) /
        product.SuggestedRetailPrice) *
        100
    );

    discountIndicator = `<span class="product-card__discount">${discountPercent}% OFF</span>`;
  }

  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        ${discountIndicator}
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    this.products = await this.dataSource.getData(this.category);
    this.renderList(this.products);

    const sortSelect = document.getElementById("sort");
    sortSelect.addEventListener("change", () => {
      this.sortProducts(sortSelect.value);
    });
  }

  sortProducts(sortType) {
    let sortedProducts = [...this.products];

    if (sortType === "name-asc") {
      sortedProducts.sort((a, b) =>
        a.NameWithoutBrand.localeCompare(b.NameWithoutBrand)
      );
    } else if (sortType === "name-desc") {
      sortedProducts.sort((a, b) =>
        b.NameWithoutBrand.localeCompare(a.NameWithoutBrand)
      );
    } else if (sortType === "price-asc") {
      sortedProducts.sort((a, b) => a.FinalPrice - b.FinalPrice);
    } else if (sortType === "price-desc") {
      sortedProducts.sort((a, b) => b.FinalPrice - a.FinalPrice);
    }

    this.renderList(sortedProducts);
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true
    );
  }
}