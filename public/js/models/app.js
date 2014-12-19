define(['backbone', 'dust'], 
  function(Backbone, dust) {
  var AppView = Backbone.View.extend({
      initialize: function(options) {
        this.childview = options.childview;
      },
      events: {
      },
      render: function() {
      },
  });
  return AppView;
});