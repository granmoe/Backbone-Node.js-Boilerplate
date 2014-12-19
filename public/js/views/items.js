define(['backbone', 'views/item', 'collections/items'], 
  function(Backbone, ItemView, Items) {
  var ItemsView = Backbone.View.extend({
      el: "#items-rows",
      initialize: function() {
        this.collection.fetch({reset: true, success: function(coll, resp, opts) {} });
        this.render();
        this.listenTo(this.collection, 'add', this.renderItem);
        this.listenTo(this.collection, 'reset', this.render);
      },
      render: function() {
        this.collection.each(function(item) {
          this.renderItem(item);
        },this);
      }, 
      renderItem: function(item) {
        var itemView = new ItemView({ model: item });
        this.$el.append(itemView.render().el);
      }     
  });
  return ItemsView;
});