'use strict';

var BaseView = require('../../common/views/base');
var $ = require('jquery');
var Backbone = require('backbone');
var Handlebars = require('handlebars');

// Create an alias to jQuery so we can say this.$('.some-selector') in our views
// and scope our lookup to be only within the view.
Backbone.$ = $;

module.exports = BaseView.extend({
    className: 'dashboard-view',
    template: Handlebars.compile(require('../templates/dashboard.html')),

    render: function() {
        this.$el.html(this.template());

        return this;
    }
});
