// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });

  qs(selector).addEventListener('click', callback);
}

// get a parameter from the URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
// Render a single template into a parent element
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

// Fetch an HTML file and return its content as a string
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// Load header and footer templates and render them
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('/partials/header.html');
  const headerElement = document.querySelector('#main-header');
  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate('/partials/footer.html');
  const footerElement = document.querySelector('#main-footer');
  renderWithTemplate(footerTemplate, footerElement);
}
