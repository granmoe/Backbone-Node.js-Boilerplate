define(['backbone', 'dust', 'underscore', 'text!templates/item.dust', 'text!templates/editCell.dust', 'models/item', 'events_bus'], 
  function(Backbone, dust, _, ItemTemplate, EditCellTemplate, Item, events_bus) {
  var ItemView = Backbone.View.extend({
      tagName: "tr",
      className: "item-row",
      model: Item,
      initialize: function() {
        var compiled = dust.compile(ItemTemplate, "item_tmpl");
        dust.loadSource(compiled);
        compiled = dust.compile(EditCellTemplate, "editCell_tmpl");
        dust.loadSource(compiled);
        this.editing = false;
        this.listenTo(events_bus, 'editing', this.turnOffEvents);
        this.listenTo(events_bus, 'doneEditing', this.delegateEvents);
        this.listenTo(events_bus, 'cancelEdit', this.cancelEdit);
      },
      events: {
        'click .editable-td': 'editData',
        'click .delete':'deleteItem',
        'keypress input': 'handleKeypress'
      },
      deleteItem: function() {
        if (this.editing) return;
        this.model.destroy();
        this.remove();
      },
      turnOffEvents: function() {
        if (!this.editing) {
          this.undelegateEvents();
        }
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
        if (this.editing) return;
        this.editing = true;
        events_bus.trigger('editing');
        this.cell = $(e.currentTarget);
        this.origValue = this.cell.text();
        var ctx = { origValue: this.origValue };
        var self = this;
        dust.render("editCell_tmpl", ctx, function(err, out){
          if (err) {
            console.log(err);
          } else {
            $(self.cell).html(out)
          }
        });
        var input = $(this.cell).find("input");
        $(input).focus();
        var len = input.val().length;
        $(input)[0].setSelectionRange(len, len);
      },
      handleKeypress: function(e) {
        switch (e.which) {
          case 13: // enter
            var cellInput = $(e.currentTarget);
            this.newValue = cellInput.val();
            this.update();
            break;
          case 27: // escape
            this.resetCell;
            break;
        }
        this.editing = false;
        events_bus.trigger('doneEditing');
      },
      resetCell: function() {
        $(this.cell).empty();
        $(this.cell).text(this.origValue);

      },
      update: function() {
        $(this.cell).empty();
        $(this.cell).text(this.newValue);
        var desc = this.$(".desc-td").text(),
            name = this.$(".name-td").text()
        var newValues = {
          "name": name,
          "description": desc
        }
        this.model.set(newValues);
        this.model.save();
      },
      cancelEdit: function() {
        this.editing = false;
        this.delegateEvents();
        this.resetCell();
      }
  });
  return ItemView;
});