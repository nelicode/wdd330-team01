import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const cartFooter = document.querySelector('.cart-footer');

  // Si el carrito está vacío
  if (cartItems.length === 0) {
    document.querySelector('.product-list').innerHTML =
      '<li class="cart-card"><p style="text-align: center; width: 100%;">Your cart is currently empty.</p></li>';

    // Ocultar la sección del total
    if (cartFooter) {
      cartFooter.classList.add('hide');
    }
    return;
  }

  // Si hay productos en el carrito
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');

  // 1. Calcular el precio total
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

  // 2. Mostrar la sección del total y actualizar el valor
  if (cartFooter) {
    cartFooter.classList.remove('hide');
    document.querySelector('.cart-total-value').innerText = `$${total.toFixed(2)}`;
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();