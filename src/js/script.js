import {settings} from './settings.js';

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
  },

  init: function() {
  },
};

app.init();