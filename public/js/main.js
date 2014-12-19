require.config({
  baseUrl:'/js/',
  paths: {
    jquery: 'libs/jquery-min',
    underscore: 'libs/underscore',
    backbone: 'libs/backbone',
    text: 'libs/text',
    dust: 'libs/dust-full',
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    dust: {
      exports: 'dust'
    }
  }
});

require(
  ['backbone', 'views/items', 'views/create', 'collections/items', 'events_bus'], 
	function(Backbone, ItemsView, CreateView, items, events_bus){
    var itemsview = new ItemsView({collection: items});
    var createView = new CreateView({collection: items});
});