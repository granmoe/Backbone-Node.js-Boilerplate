define(['backbone', 'dust', 'text!templates/app.dust', 'models/item'], 
  function(Backbone, dust, AppTemplate, Item) {
  var AppView = Backbone.View.extend({
      el: "#app",
      initialize: function() {
        var compiled = dust.compile(AppTemplate, "app_tmpl");
        dust.loadSource(compiled);
        this.render();
      },
      events: {
        // 'click something' : 'doSomething'
      },
      render: function() {
        var dustContext = this.model.toJSON() || '';
        var self = this;
        dust.render("app_tmpl", dustContext, function(err, out){
          if (err) {
            console.log(err);
          } else {
            self.$el.html(out);
          }
        });
      }      
  });
  return AppView;
});