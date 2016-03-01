var express = require('express');
var path = require('path');
var connectlr = require('connect-livereload');

var app = express();

// Default NODE_ENV to "development".
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Configure livereload middleware for the local environment.
 */
if (process.env.NODE_ENV == 'development') {
    app.use(connectlr({port: 35729}));
}

// Set the static files location.
app.use(express.static(__dirname + '/../dist'));

/**
 * Catch-all route which renders the main client app entry point template so the
 * client app can handle routing from then on. This enables us to hit refresh on
 * any page of the single page web application.
 */
app.use('/*', function(request, response) {
    response.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});

app.use(function(error, request, result, next) {
    if (error.message) {
        error = error.message;
    }
    result.status(500).send({message: error});
});

// Start the service.
app.listen(3000, function () {
    console.log('Listening - ENV %s - PORT %s', process.env.NODE_ENV, 3000);
});

module.exports = app;