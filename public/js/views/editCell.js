define(['backbone', 'dust', 'text!templates/editCell.dust', 'models/item'], 
  function(Backbone, dust, template, Item) {
  var EditCellView = Backbone.View.extend({
      initialize: function(options) {
        var compiled = dust.compile(template, "template");
        dust.loadSource(compiled);
        origValue = this.$el.text();
        this.$el.addClass("cellEditing");
        this.parentView = options.parentView;
        this.parentView.undelegateEvents();
        this.render();
      },
      events: {
        'keypress': 'handleKeypress'
      },
      exit: function(doUpdate) {
        var newValue = this.$("input").val();
        this.$el.removeClass("cellEditing");
        this.$el.empty();
        if (doUpdate) {
          this.$el.text(newValue);
          this.parentView.trigger('dataChanged');
        } else {
          this.$el.text(origValue);
        }
        this.parentView.delegateEvents();
      },
      render: function() {
        this.$el.empty();
        var ctx = { origValue: origValue };
        var self = this;
        dust.render("template", ctx, function(err, out){
          if (err) {
            console.log(err);
          } else {
            self.$el.html(out);
          }
        });
        return this;
      },
      handleKeypress: function(e) {
        switch (e.which) {
          case 13: // enter
            this.exit(true);
            break;
          case 27: // esc
            this.exit(false);
            break;
        }
      }
  });
  return EditCellView;
});