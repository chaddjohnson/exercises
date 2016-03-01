'use strict';

var BaseView = require('../../common/views/base');
var $ = require('jquery');
var Backbone = require('backbone');
var Handlebars = require('handlebars');
var ListItemView = require('./listItem');

// Create an alias to jQuery so we can say this.$('.some-selector') in our views
// and scope our lookup to be only within the view.
Backbone.$ = $;

module.exports = BaseView.extend({
    className: 'products-view',
    template: Handlebars.compile(require('../templates/list.html')),

    render: function() {
        var data = this.collection.toJSON();

        // Render the template.
        this.$el.html(this.template(data));

        // Render all items (products) within this template.
        this.renderListItems();

        return this;
    },

    renderListItems: function() {
        var tbody = this.$('#products tbody');

        // Loop through each item in the collection of products, and render a view to handle each.
        this.collection.each(function(product) {
            var view = new ListItemView({model: product});
            tbody.append(view.render().el);
        });
    }
});
