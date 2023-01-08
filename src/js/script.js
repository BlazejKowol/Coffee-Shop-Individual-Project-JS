import {select, settings, templates, utils} from './settings.js';

const app = {
  initData: function(){
    const url = settings.db.url + '/' + settings.db.products;
    this.data = {};
    fetch(url)
      .then((rawResponse) => {
        return rawResponse.json();
      })
      .then ((parsedResponse) => {
        this.data.products = parsedResponse;
      });
    console.log('this data:', this.data);
  },
  
  render() {
    const generatedHTML = templates.products(this.data);
    
    this.element = utils.createDOMFromHTML(generatedHTML);
    const productContainer = document.querySelector(select.containerOf.products);
    productContainer.appendChild(this.element);
  },

  init: function() {
    this.initData();
    this.render();
  },
};

app.init();