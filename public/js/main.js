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
  ['backbone', 'views/app', 'models/thing'], 
	function(Backbone, AppView, Thing){

    // Override Backbone.sync with ReSTful API to load initial data, remaining methods could be written on server side

    // Backbone.origSync = Backbone.sync;
    // Backbone.customSync = function(method, model, option) {
    //     if (method == 'read') return Backbone.origSync(method, model, option);
    //     console.log(method + ' method called for model: ' + JSON.stringify(model));
    // }
    // Backbone.sync = Backbone.customSync;
    
    var thing = new Thing();
    var appview = new AppView({model: thing});
});