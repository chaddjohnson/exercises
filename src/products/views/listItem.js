'use strict';

var BaseView = require('../../common/views/base');
var $ = require('jquery');
var Backbone = require('backbone');
var Handlebars = require('handlebars');

// Create an alias to jQuery so we can say this.$('.some-selector') in our views
// and scope our lookup to be only within the view.
Backbone.$ = $;

module.exports = BaseView.extend({
    className: 'product-item-view',
    template: Handlebars.compile(require('../templates/listItem.html')),

    // Specify the type of the HTML element corresponding to this view.
    tagName: 'tr',

    // Handle events for things within this view.
    events: {
        'click .delete': 'destroy'
    },

    // Called when this view is created.
    initialize: function() {
        // When the "destroy()" method is called on the model, immediately remove this view.
        // Note that "remove()" is a built-in Backbone View method.
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
        var data = this.model.toJSON();

        this.$el.html(this.template(data));

        return this;
    },

    destroy: function() {
        var view = this;

        // This prevents the page's scrollbar from jumping up.
        event.preventDefault();

        if (confirm('Are you sure you want to delete this product?')) {
            // Fade the element out of view.
            view.$el.fadeOut(function() {
                // Tell the API to delete the product corresponding to this view, and
                // handle any failure that may occur.
                view.model.destroy().fail(function() {
                    alert('There was an error deleting this product. Please try again later.');
                });
            });
        }
    }
});
