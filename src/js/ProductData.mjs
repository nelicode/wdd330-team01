export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${category}.json`;
  }

  async getData() {
    const response = await fetch(this.path);
    if (response.ok) {
      const data = await response.json();
      return data;
    } 
    else {
      throw new Error("Bad Response");
    }
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}