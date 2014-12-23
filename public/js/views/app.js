define(['backbone', 'dust', 'text!templates/app.dust', 'collections/items', 'views/items', 'views/create', 'events_bus', 'app'],
  function(Backbone, dust, AppTemplate, Items, ItemsView, CreateView, events_bus, app) {
  var AppView = Backbone.View.extend({
      el: "#app",
      editMode: false,
      initialize: function() {
        var compiled = dust.compile(AppTemplate, "app_tmpl");
        dust.loadSource(compiled);
        this.listenTo(events_bus, 'editing', this.startEditing);
        this.listenTo(events_bus, 'doneEditing', this.stopEditing);
        this.render();
      },
      events: {
        'click' : 'handleClick'
      },
      handleClick: function(e) {
        var target = $(e.target);
        if (target.is("button")) return; // we handle these elsewhere
        // only handle clicks outside of items-table, items-table clicks handled in item view
        if (!(target).parents("#items-table").length) {
          console.log("handleClick, app.js")
          app.editView.update();
          this.stopEditing();
        }
      },
      resetCell: function() {
        $(app.cell).empty();
        $(app.cell).text(app.origValue);
      },
      startEditing: function() {
        if (app.editMode) return; // already in edit mode, don't need to do anything
        app.editMode = true;
        this.$(":button").attr("disabled", "disabled");
      },
      stopEditing: function() {
        app.editMode = false;
        delete app.editView;
        this.$(":button").removeAttr("disabled");
      },
      render: function() {
        var self = this;
        var ctx = {};
        dust.render("app_tmpl", ctx, function(err, out){
          if (err) {
            console.log(err);
          } else {
            self.$el.html(out);
          }
        });
        this.renderItemsView();
        this.renderCreateView();
      },
      renderItemsView: function() {
        this.itemsView = new ItemsView({collection: Items});
      },
      renderCreateView: function() {
        this.createView = new CreateView();
      }
  });
  return AppView;
}); 