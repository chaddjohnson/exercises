var express = require('express');
var router = require('./router');
var app = express();

// Default NODE_ENV to "development".
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Initialize view engine.
app.engine('hbs', exphbs({
	extname: '.hbs',
	layoutsDir: __dirname + '/../src/app/views/layouts',
	defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/../src/app/views');

if (process.env.NODE_ENV == 'production') {
    app.enable('view cache');
}

// Set the static files location.
app.use(express.static(__dirname + '/../src'));

// Initialize routes.
router.map(app);

//Handle errors
app.use(function(error, request, result, next) {
    if (error.message) {
        error = error.message;
    }
    result.status(500).send({message: error});
});

// Start service
app.listen(3000, function () {
    console.log('Listening - ENV %s - PORT %s', process.env.NODE_ENV, 3000);
});

module.exports = app;
