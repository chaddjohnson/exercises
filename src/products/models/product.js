'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    idAttribute: '_id',
    //urlRoot: 'http://localhost:4000/products/'
    urlRoot: function() {
        if (this.get('id')) {
            return 'http://localhost:4000/products/' + this.get('id');
        }
        else {
            return 'http://localhost:4000/products/';
        }
    }
});