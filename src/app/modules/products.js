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

        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3000/products/:id' + productId,
            contentType: 'application/json',
            data: JSON.stringify({
               name: $('#productForm [name=name]').val(),
               id: $(this).closest('tr').data('product-id'),
               quantity: parseInt($('#productForm [name=quantity]').val()),
               price: parseFloat($('#productForm [name=price]').val()),
               description: $('#productForm [name=description]').val(),
            }),
            success: function() {
                // Product saved successfully, so redirect back to the Products page.
                window.location = '/products';
            }
        });
    });
});
