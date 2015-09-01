var dashboard = require('./dashboard/routes');
var products = require('./products/routes');

module.exports.map = function(app) {
    app.use(dashboard);
    app.use(products);
};
