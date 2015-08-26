$(document).ready(function(){
	$('.products').on('click', '.delete', function(event) {
		event.preventDefault();
	    if(confirm('Are you sure you want to delete this product?')) {
    	    alert('deleting product');
    	};
    });
});

