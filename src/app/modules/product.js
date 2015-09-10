$(document).ready(function() {
    //Determine which product is being edited based on the URL.
    var url = window.location.pathname;
    var productId = url.substring(url.lastIndexOf('/') +);

    //Get data for the product.
    $.get('/mocks/products/' + productId + '.json', function(response) {
        console.log(response);
        var templateFN = Handlebars.getTemplate('products/edit.hbs');
        var templateData = response;

        $('main').html(templateFn(templateData));        
    });
});
