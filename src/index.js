const express = require ('express');

const app = express ();

app.use (express.json ());

app.set ('view engine', 'ejs');

const mainProductController = require ('./controllers/mainProduct.controller');
app.use ('/mainProducts', mainProductController);

const productController = require ('./controllers/product.controller');
app.use ('/products', productController);

module.exports = app;