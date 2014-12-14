define([
	'underscore',
  'backbone'
  ], function(_, Backbone){

	var Item = Backbone.Model.extend({
		idAttribute: "_id",
		initialize: function() {
		},
		defaults: {

		}
  });
  return Item;
});