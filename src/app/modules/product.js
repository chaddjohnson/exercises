$(document).ready(function() {
    // Determine which product is being edited based on the URL.
    var url = window.location.pathname;
    var productId = url.substring(url.lastIndexOf('/') + 1);
    var templateFn = Handlebars.getTemplate('products/edit.hbs');

    if (productId === 'new') {
        productId = null;
    }

    // If there is a product ID (present in the URL), then request the product's data
    // from the API. Otherwise, just render the template without data.
    if (productId) {
        // Get data for the product.
        $.get('http://localhost:4000/products/' + productId, function(response) {
            // Render the product "edit" template, and pass the product data to the template.
            $('main').html(templateFn(response));
        });
    }
    else {
        // Render the product "edit" template without passing any data to it.
        $('main').html(templateFn());
    }
    
    // Put data for the product.
    $(document).on('submit', '#productForm', function(event) {
        event.preventDefault();

    if (productId) {
        // An existing product is being edited, so do a PUT.
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:4000/products/' + productId,
            contentType: 'application/json',
            data: JSON.stringify({
                name: $('#productForm [name=name]'.val(),
                quantity: parseInt($('#productForm [name=quantity]').val()),
                price: parseFloat($('#productForm [name=price]').val()),
                description: $('#productForm [name=description]').val(),
            }),
            success: function() {
                // Product saved successfully, so redirect back to the Products page.
                window.location = '/products';
            }
        });
    }
    else {
        // A new product is being created, so do a POST.
        $.ajax({
            type: 'POST',
            url: 'http://localhost:4000/products/',
            contentType: 'application/json',
            data: JSON.stringify({
                name: $('#productForm [name=name]').val(),
                quantity: parseInt($('#productForm [name=quantity]').val()),
                price: parseFloat($('#productForm [name=price]').val()),
                description: $('productForm [name=description]').val(),
            }),
            success: function() {
                // Product saved successfully, so redirect back to the Products page.
                window.localhost = '/products';
            }
        });
    }
});
