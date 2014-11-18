define(['underscore', 'backbone'], function (_, Backbone) {
    return _.extend({}, Backbone.Events);
});

// use this as a common object to share events between different backbone views