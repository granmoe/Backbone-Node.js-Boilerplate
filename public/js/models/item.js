define([
	'underscore',
  'backbone'
  ], function(_, Backbone){

	var Item = Backbone.Model.extend({
		initialize: function() {

		},
		defaults: {
			name: 'world'
		}
  });
  return Item;
});