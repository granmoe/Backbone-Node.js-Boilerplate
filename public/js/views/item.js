define(['backbone', 'dust', 'text!templates/item.dust', 'models/item'], 
  function(Backbone, dust, ItemTemplate, Item) {
  var ItemView = Backbone.View.extend({
      tagName: "tr",
      className: "item-row",
      model: Item,
      initialize: function() {
        var compiled = dust.compile(ItemTemplate, "item_tmpl");
        dust.loadSource(compiled);
      },
      events: {
        'click .delete':'deleteItem'
      },
      deleteItem: function() {
        console.log("deleteItem method");
        console.log(this.model.url());
        console.log(JSON.stringify(this.model.toJSON()));
        console.log(this.model.id);
        // Delete model and corresponding db entity
        this.model.destroy();

        // Delete this view
        this.remove();
      },
      render: function() {
        var dustContext = this.model.toJSON();
        var self = this;
        dust.render("item_tmpl", dustContext, function(err, out){
          if (err) {
            console.log(err);
          } else {
            self.$el.html(out);
          }
        });
        return this;
      }
  });
  return ItemView;
});