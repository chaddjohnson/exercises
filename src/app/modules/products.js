$(document).ready(function() {
    // Get data for products from /mocks/products.json via AJAX
    $("button").click(function(){
    $.post("/mocks/products.json",
    {
        //Populate the "products" table's tbody element with tr elements based on the response data array.
        var table = $("#products tbody");
            $.each(data, function(idx, elem){
                table.append("<tr><td>"+elem._id+"</td><td>"+elem.name+"</td><td>"+elem.quantity+"</td><td>"+elem.price+"</td><td>"+elem.description+"</td></tr>");
            });
    },
        function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
    });

        
    $('#products').on('click', '.delete', function(event) {
        event.preventDefault();

        if (confirm('Are you sure you want to delete this product?')) {
            alert('deleting product');
        };
    });
});
