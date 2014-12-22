define(['backbone', 'dust', 'underscore', 'text!templates/item.dust', 'text!templates/editCell.dust', 'models/item', 'events_bus', 'app'], 
  function(Backbone, dust, _, ItemTemplate, EditCellTemplate, Item, events_bus, app) {
  var ItemView = Backbone.View.extend({
      tagName: "tr",
      className: "item-row",
      model: Item,
      initialize: function() {
        var compiled = dust.compile(ItemTemplate, "item_tmpl");
        dust.loadSource(compiled);
        compiled = dust.compile(EditCellTemplate, "editCell_tmpl");
        dust.loadSource(compiled);
      },
      events: {
        'click .editable-td': 'editData',
        'click .delete':'deleteItem',
        'keypress input': 'handleKeypress'
      },
      deleteItem: function() {
        if (app.editMode) return;
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
        var target = $(e.target);
        if (($(target).has("input").length) || ($(target).prop('tagName') === 'INPUT')) return;
        if (app.editMode) this.resetCell();
        events_bus.trigger('editing');
        app.cell = $(e.currentTarget);
        app.origValue = app.cell.text();
        var ctx = { origValue: app.origValue };
        dust.render("editCell_tmpl", ctx, function(err, out){
          if (err) {
            console.log(err);
          } else {
            $(app.cell).html(out)
          }
        });
        var input = $(app.cell).find("input");
        $(input).focus();
        var len = input.val().length;
        $(input)[0].setSelectionRange(len, len);
      },
      handleKeypress: function(e) {
        switch (e.which) {
          case 13: // enter
            var cellInput = $(e.currentTarget);
            app.newValue = cellInput.val();
            this.update();
            break;
          case 27: // escape
            this.resetCell;
            break;
        }
        events_bus.trigger('doneEditing');
      },
      update: function() {
        $(app.cell).empty();
        $(app.cell).text(app.newValue);
        var desc = this.$(".desc-td").text(),
            name = this.$(".name-td").text()
        var newValues = {
          "name": name,
          "description": desc
        }
        this.model.set(newValues);
        this.model.save();
      },
      resetCell: function() {
        $(app.cell).empty();
        $(app.cell).text(app.origValue);
      }
  });
  return ItemView;
});