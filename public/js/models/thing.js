define([
	'underscore',
  'backbone'
  ], function(_, Backbone){

	var Thing = Backbone.Model.extend({
		initialize: function() {

		},
		defaults: {
			name: 'world'
		}
  });
  return Thing;
});