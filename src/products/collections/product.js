'use strict';

var Backbone = require('backbone');
var ProductModel = require('../models/product');

module.exports = Backbone.Collection.extend({
    model: ProductModel,
    url: 'http://localhost:4000/products'
});