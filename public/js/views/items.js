define(['backbone', 'views/item'], 
  function(Backbone, ItemView) {
  var ItemsView = Backbone.View.extend({
      el: "#items-rows",
      initialize: function() {
        this.collection.fetch({reset: true, success: function(coll, resp, opts){
            // console.log(resp);
            // console.log("length after fetch: " + coll.length);
          }});
        this.render();
        this.listenTo(this.collection, 'add', this.renderItem);
        this.listenTo(this.collection, 'reset', this.render);
      },
      events: {
        // 'click something' : 'doSomething'
      },
      render: function() {
        console.log(this.collection.length);
        this.collection.each(function(item) {
          console.log(JSON.stringify(item.toJSON()));
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