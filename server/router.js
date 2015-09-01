var main = require('./main/routes');
var products = require('./products/routes');

module.exports.map = function(app) {
    app.use(main);
    app.use(products);
};
