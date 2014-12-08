define([
  'backbone', 
  'models/item'
  ], function(Backbone, Item){

	var ItemsCollection = Backbone.Collection.extend({
    model: Item,
    url: '/api/items',
    month: '',
    year: '',
  });
  return new ItemsCollection();
});