const express = require ('express');



const numberVerifyController =require("./controllers/signup-login/number-verify.controller");

const {register,login} = require("./controllers/signup-login/user.controller");

const app = express ();

app.use (express.json ());

app.set ('view engine', 'ejs');

app.use("/signup-login",numberVerifyController);

app.use("/signup",register);

app.use("/login",login);




const wishlistController = require ('./controllers/wishlist.controller');
app.use ('/wishlists', wishlistController);

app.get ('/', async (req, res) => {
  return res.render ('index');
});
app.use (express.static ('public'));
module.exports = app;
