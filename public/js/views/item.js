define(['backbone', 'dust', 'text!templates/item.dust', 'models/item', 'views/editCell'], 
  function(Backbone, dust, ItemTemplate, Item, EditCellView) {
  var ItemView = Backbone.View.extend({
      tagName: "tr",
      className: "item-row",
      model: Item,
      initialize: function() {
        var compiled = dust.compile(ItemTemplate, "item_tmpl");
        dust.loadSource(compiled);
        this.on('dataChanged', this.update);
        console.log(this.model.toJSON());
      },
      events: {
        'click .editable-td': 'editData',
        'click .delete':'deleteItem',
        'change td': 'update'
      },
      deleteItem: function() {
        this.model.destroy();
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
      },
      editData: function(e) {
        var cell = $(e.currentTarget);
        var len = $(cell).val().length;
        $(cell).selectionStart = len;
        $(cell).selectionEnd = len;
        $(cell).focus();
        var editCellView = new EditCellView({ el: cell, model: this.model, parentView: this });
      },
      update: function() {
        var desc = this.$(".desc-td").text(),
            name = this.$(".name-td").text()
        var newValues = {
          "name": name,
          "description": desc
        }
        this.model.set(newValues);
        this.model.save();
      }
  });
  return ItemView;
});