'use strict';

var BaseView = require('../base');
var $ = require('jquery');
var Backbone = require('backbone');
var Handlebars = require('handlebars');

// Create an alias to jQuery so we can say this.$('.some-selector') in our views
// and scope our lookup to be only within the view.
Backbone.$ = $;

module.exports = BaseView.extend({
    className: 'product-view',
    template: Handlebars.compile(require('../../templates/products/edit.html')),

    events: {
        'submit #productForm': 'submit'
    },

    render: function() {
        var data = this.model.toJSON();
        this.$el.html(this.template(data));

        return this;
    },

    submit: function() {
        // Save the model. Behind the scenes this will send data to the API.
        this.model.save().then(function() {
            // Once saved, return to the Product List page.
            Backbone.history.navigate('products', true);
        }).fail(function() {
            alert('There was an error saving. Please try again later.');
        });
    }
});
