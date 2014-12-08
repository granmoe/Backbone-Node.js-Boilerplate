define(['backbone', 'dust', 'text!templates/item.dust', 'models/item'], 
  function(Backbone, dust, ItemTemplate, Item) {
  var ItemView = Backbone.View.extend({
      tagName: "tr",
      className: "item-row",
      model: Item,
      events: {
        // 'click something' : 'doSomething'
      },
      initialize: function() {
        var compiled = dust.compile(ItemTemplate, "item_tmpl");
        dust.loadSource(compiled);
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