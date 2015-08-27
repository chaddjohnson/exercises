var express = require('express');
var router = express.Router();
var controller = require('./controller');

router.get('/products', controller.products);
router.get('/products/:id', controller.product);

module.exports = router;