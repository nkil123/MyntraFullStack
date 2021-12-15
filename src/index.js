const express = require ('express');

const app = express ();

app.use (express.json ());

app.set ('view engine', 'ejs');

const mainProductController = require ('./controllers/mainProduct.controller');
app.use ('/mainProducts', mainProductController);

const productController = require ('./controllers/product.controller');
app.use ('/products', productController);

const wishlistController = require ('./controllers/wishlist.controller');
app.use ('/wishlists', wishlistController);

app.get ('/', async (req, res) => {
  return res.render ('index');
});
app.use (express.static ('public'));
module.exports = app;
