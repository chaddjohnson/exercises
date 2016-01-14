$(document).ready(function() {
    // Get data for products.
    $.get('http://localhost:4000/products', function(response) {
        var templateFn = Handlebars.getTemplate('products/list.hbs');
        var templateData = {
            products: response
        };
        $('main').html(templateFn(templateData));
    });

    // Option for deleting products.
    $(document).on('click', '#products .delete', function(event) {
        event.preventDefault(); 

        if (confirm('Are you sure you want to delete this product?')) {
            alert('deleting product');
        }
    });
});
