'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
var ProductCollection = require('../../products/collections/product');
var ProductModel = require('../../products/models/product');
var DashboardView = require('../../dashboard/views/dashboard');
var ProductListView = require('../../products/views/list');
var ProductEditView = require('../../products/views/edit');

module.exports = Backbone.Router.extend({
    routes: {
        '': 'index',
        'dashboard': 'dashboard',
        'products': 'products',
        'products/new': 'product',
        'products/:id/edit': 'product'
    },

    show: function(view) {
        if (this.view) {
            // Cleanly remove the currently-shown view.
            this.view.close();
        }

        // Show the view.
        $('main').html(view.render().el);
        this.view = view;
    },

    index: function() {
        Backbone.history.navigate('dashboard', true);
    },

    dashboard: function() {
        this.show(new DashboardView());
    },

    products: function() {
        var router = this;
        var collection = new ProductCollection();

        collection.fetch().then(function() {
            router.show(new ProductListView({collection: collection}));
        });
    },

    product: function(id) {
        var router = this;
        var model = new ProductModel();

        if (id !== 'new') {
            model.fetch({id: id}).then(function() {
                router.show(new ProductEditView({model: model}));
            });
        }
        else {
            router.show(new ProductEditView({model: model}));
        }
    }
});