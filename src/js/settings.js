export const select = {
  templateOf: {
    product: '#template-product',
  },
  containerOf: {
    products: '#products-page',
  },
};

export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    products: 'products',
  }
};

export const templates = {
  products: Handlebars.compile(document.querySelector(select.templateOf.product).innerHTML),
};