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

class Contact{
  constructor(contactPage){

    this.render(contactPage);
  }

  render(contactPage){
    const generatedHTML = templates.contact();
    this.dom = {};
    this.dom.wrapper = contactPage;
    this.dom.wrapper.innerHTML = generatedHTML;
  }
}

const app = {
  initPages: function(){
    const thisApp = this;

    this.pages = document.querySelector(select.containerOf.pages).children;
    this.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = this.pages[0].id;

    for(let page of this.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }

    this.activatePage(pageMatchingHash);

    for(let link of this.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');

        thisApp.activatePage(id);

        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function(pageId){

    for(let page of this.pages){
      page.classList.toggle('active', page.id == pageId);
    }

    for(let link of this.navLinks){
      link.classList.toggle(
        'active', 
        link.getAttribute('href') == '#' + pageId);
    }
  },
  
  initProduct: function(){
    console.log('this data:', this.data);

    for(let product in this.data.products){
      new Product(product, this.data.products[product]);
    }
  },

  initContact: function (){
    const contactPage = document.querySelector(select.containerOf.contact);

    this.contact = new Contact(contactPage);
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
    this.initPages();
    this.initContact();
    this.initData();
  },
};

app.init();