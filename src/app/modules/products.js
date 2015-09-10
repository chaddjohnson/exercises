$(document).ready(function() {
    // Get data for products.
    $.get('/mocks/products.json', function(response) {
        var templateFn = Handlebars.getTemplate('products/list.hbs');
        var templateData = {
            products: response
        };

        $('main').html(templateFn(templateData));
    });        
    // Option for deleting products.
    $('#products').on('click', '.delete', function(event) {
        event.preventDefault(); 

        if (confirm('Are you sure you want to delete this product?')) {
            alert('deleting product');
        };
    });
});
