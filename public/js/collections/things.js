define([
  'backbone', 
  'models/thing'
  ], function(Backbone, Thing){

	var EventsCollection = Backbone.Collection.extend({
    model: Thing,
    url: '/api/things',
    month: '',
    year: '',
  });
  return new ThingsCollection();
});