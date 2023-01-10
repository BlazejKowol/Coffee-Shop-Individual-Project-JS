import {select, settings, templates} from './settings.js';
import utils from './utils.js';

class Product{
  constructor(id, data){

    this.id = id;
    this.data = data;

    this.render();
    console.log('new Product', this);
  }

  render(){

    const generatedHTML = templates.products(this.data);
    this.element = utils.createDOMFromHTML(generatedHTML);

    const productContainer = document.querySelector(select.containerOf.products);
    productContainer.appendChild(this.element);
  }
}

const app = {
  
  initProduct: function(){
    console.log('this data:', this.data);

    for(let product in this.data.products){
      new Product(product, this.data.products[product]);
    }
  },

  initData: function(){

    this.data = {};
    const url = settings.db.url + '/' + settings.db.products;

    fetch(url)
      .then((rawResponse) => {
        return rawResponse.json();
      })
      .then ((parsedResponse) => {
        this.data.products = parsedResponse;
        this.initProduct();
      });
    console.log('This Data', JSON.stringify(this.data));
  },

  init: function() {
    this.initData();
  },
};

app.init();