import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const cartFooter = document.querySelector('.cart-footer');

  if (cartItems.length === 0) {
    document.querySelector('.product-list').innerHTML =
      '<li class="cart-card"><p style="text-align: center; width: 100%;">Your cart is currently empty.</p></li>';

    if (cartFooter) {
      cartFooter.classList.add('hide');
    }
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');

  // Sumar el total de los artículos en el carrito
  const total = cartItems.reduce((sum, item) => sum + (item.FinalPrice || item.ListPrice || 0), 0);

  // Mostrar el contenedor y colocar el monto en .cart-total-value
  if (cartFooter) {
    cartFooter.classList.remove('hide');
    const totalElement = document.querySelector('.cart-total-value');
    if (totalElement) {
      totalElement.innerText = `$${total.toFixed(2)}`;
    }
  }
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

renderCartContents();