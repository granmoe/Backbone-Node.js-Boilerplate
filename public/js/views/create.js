define(
	['backbone', 'dust', 'models/item', 'text!templates/create.dust'],
	function(Backbone, dust, Item, template){
		var CreateView = Backbone.View.extend({
			el: "#create-form",
			model: Item,
			initialize: function() {
				var compiled = dust.compile(template, 'template');
				dust.loadSource(compiled);
				this.render();
			},
			events: {
				'click #create-btn': 'create'
			},
			create: function() {
				// get form fields and create model / add to collection
				var attrs = {
					'name' : this.$el.find("#name").val(),
					'description' : this.$el.find("#description").val()
				}
				this.$el.find("#name").val('');
				this.$el.find("#description").val('');
				this.collection.create(attrs, {wait: true});
			},
			render: function() {
				var ctx = {};
				var self = this;
				dust.render('template', ctx, function(err, out){
					if (err) {
						console.log(err)
					} else {
						self.$el.html(out);
					}
				});
			}
		});
		return CreateView;
	})