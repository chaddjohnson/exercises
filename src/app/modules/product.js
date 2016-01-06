$(document).ready(function() {
    // Determine which product is being edited based on the URL.
    var url = window.location.pathname;
    var productId = url.substring(url.lastIndexOf('/') +1);

    // Get data for the product.
    $.get('http://localhost:4000/products/' + productId, function(response) {
        var templateFn = Handlebars.getTemplate('products/edit.hbs');
        var templateData = response;

        $('main').html(templateFn(templateData));        
    });
    
    // Put data for the product.
    $(document).on('submit', '#productForm', function(event) {
        event.preventDefault();

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:4000/products/' + productId,
            contentType: 'application/json',
            data: JSON.stringify({
               name: $('#productForm [name=name]').val(),
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
