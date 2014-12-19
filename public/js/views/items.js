define(['backbone', 'views/item'], 
  function(Backbone, ItemView) {
  var ItemsView = Backbone.View.extend({
      el: "#items-rows",
      initialize: function() {
        this.collection.fetch({reset: true, success: function(coll, resp, opts) {} });
        this.render();
        this.listenTo(this.collection, 'add', this.renderItem);
        this.listenTo(this.collection, 'reset', this.render);
        window["items" + this.cid] = this;
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