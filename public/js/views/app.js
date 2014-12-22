define(['backbone', 'dust', 'text!templates/app.dust', 'collections/items', 'views/items', 'views/create', 'events_bus'],
  function(Backbone, dust, AppTemplate, Items, ItemsView, CreateView, events_bus) {
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
        'click #items-table' : 'handleTableClick'
      },
      handleTableClick: function(e) {
        var target = $(e.target);
        // is a TD that isn't being edited
        if (!($(target).has("input").length) && !($(target).prop('tagName') === 'INPUT')) {
          events_bus.trigger('cancelEdit', target);
          this.stopEditing();
        }
        // if editable-td, switch to editing that td
      },
      startEditing: function() {
        this.editMode = true;
        this.$(":button").attr("disabled", "disabled");
      },
      stopEditing: function() {
        this.editMode = false;
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