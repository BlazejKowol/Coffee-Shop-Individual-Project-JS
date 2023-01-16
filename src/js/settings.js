export const select = {
  templateOf: {
    home: '#template-home',
    product: '#template-product',
    contact: '#template-contact',
  },
  containerOf: {
    pages: '#pages',
    home: '#home-page',
    products: '#products-page',
    contact: '#contact-page',
    productsSection: '#products',
    contactSection: '#contact',
  },
  nav: {
    links: '.main-nav a',
  },
};

export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    products: 'products',
  }
};

export const templates = {
  home: Handlebars.compile(document.querySelector(select.templateOf.home).innerHTML),
  products: Handlebars.compile(document.querySelector(select.templateOf.product).innerHTML),
  contact: Handlebars.compile(document.querySelector(select.templateOf.contact).innerHTML),
};