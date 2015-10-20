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
    $("productForm").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "PUT",
            url: "src/app/templates/products/edit.hbs",
            data: ".json" + val,
            success: function() {
                $("").val("");
            }
        });
    });
});
