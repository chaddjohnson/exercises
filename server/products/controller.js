module.exports.products = function(request, response) {
    response.render('products/products');
};

module.exports.newProduct = function(request, response) {
	response.render('products/product');
};

module.exports.product = function(request, response) {
    var data = {
        id: request.params.id
    };
    response.render('products/product', data);
};
