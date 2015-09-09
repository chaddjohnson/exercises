$(document).ready(function() {
    // Get data for products from /mocks/products.json via AJAX
    $.get('/mocks/products.json', function(response) {
        var tableBody = $('#products tbody');
<<<<<<< HEAD

        // Populate the 'products' table's tbody elementent with tr elementents based on the response data array.
        $.each(response, function(index, element){
            tableBody.append(
        	    '<tr>' +
        	    '<td>' + element._id + '</td>' +
        	    '<td>' + element.name + '</td>' +
        	    '<td>' + element.quantity + '</td>' +
        	    '<td>' + element.price + '</td>' +
        	    '<td><a href="/products/1">Edit</a></td>' +
        	    '<td><a class="delete" href="#">Delete</a></td>' +
        	    '</tr>'
=======
        $.each(response, function(index, element) {
            tableBody.append(
            	'<tr>' + 
            	'<td>' + element._id + '</td>' +
            	'<td>' + element.name + '</td>' +
            	'<td>' + element.quantity + '</td>' +
            	'<td>' + element.price + '</td>' +
            	'<td><a href="/products/1">Edit</a></td>' +
            	'<td><a class="delete" href="#">Delete</a></td>' +
            	'</tr>'
>>>>>>> origin/master
        	);
        });
    });               
    
    $('#products').on('click', '.delete', function(event) {
        event.preventDefault();

        if (confirm('Are you sure you want to delete this product?')) {
            alert('deleting product');
        };
    });
});
