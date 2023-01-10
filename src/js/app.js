import {select, settings, templates} from './settings.js';
import utils from './utils.js';

class Product{
  constructor(data, id){
    this.data = data;
    this.id = id;

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
    const url = settings.db.url + '/' + settings.db.products;
    this.data = {};
    fetch(url)
      .then((rawResponse) => {
        return rawResponse.json();
      })
      .then ((parsedResponse) => {
        this.data.products = parsedResponse;
        this.initProduct();
      });
    //console.log('this data:', this.data);
  },

  init: function() {
    this.initData();
  },
};

app.init();