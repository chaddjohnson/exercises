function showProducts() {
    // Get data for products.
    $.get('http://localhost:4000/products', function(response) {
        var templateFn = Handlebars.getTemplate('products/list.hbs');
        var templateData = {
            products: response
        };
        $('main').html(templateFn(templateData));
    });
}

$(document).ready(function() {
    // Show products on load.
    showProducts();

    // Option for deleting products.
    $(document).on('click', '#products .delete', function(event) {
        var deleteProductId = $(this).closest('tr').data('product-id');
        
        event.preventDefault(); 

        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:4000/products/' + deletionProductId,
            contentType: 'application/json',
            data: JSON.stringify({
               name: $('#productForm [name=name]').val(),
               id: $(this).closest('tr').data('product-id'),
               quantity: parseInt($('#productForm [name=quantity]').val()),
               price: parseFloat($('#productForm [name=price]').val()),
               description: $('#productForm [name=description]').val(),
            }),
            success: function() {
                // Product deleted successfully, so refresh the product list.
                showProducts();
            }
        });
    });
});
