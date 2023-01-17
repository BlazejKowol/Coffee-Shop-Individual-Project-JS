import {select, settings, templates} from './settings.js';
import utils from './utils.js';

class Product{
  constructor(id, data){

    this.id = id;
    this.data = data;

    this.render();
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

class Home{
  constructor(homePage){

    this.render(homePage);
  }

  render(homePage){
    const generatedHTML = templates.home();
    this.dom = {};
    this.dom.wrapper = homePage;
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
      if(!page.classList.contains('active')){
        page.classList.add('hidden');
      } else {
        page.classList.remove('hidden');
      }
      if(pageId == 'home' && page.classList.contains('active')){
        const pageProducts = document.querySelector(select.containerOf.productsSection);
        const pageContact = document.querySelector(select.containerOf.contactSection);
        pageProducts.classList.remove('hidden');
        pageProducts.classList.add('active');
        pageContact.classList.add('hidden');
        break;
      }
    }

    for(let link of this.navLinks){
      link.classList.toggle('active', 
        link.getAttribute('href') == '#' + pageId);
    }

  },
  
  initProduct: function(){

    for(let product in this.data.products){
      new Product(product, this.data.products[product]);
    }
  },

  initContact: function(){
    const contactPage = document.querySelector(select.containerOf.contact);

    this.contact = new Contact(contactPage);
  },

  initHome: function(){
    const homePage = document.querySelector(select.containerOf.home);

    this.home = new Home(homePage);
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
  },

  init: function() {
    this.initData();
    this.initHome();
    this.initContact();
    this.initPages();
  },
};

app.init();