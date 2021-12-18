const express = require ('express');
require ('dotenv').config ();
const port = process.env.PORT || 2233;
const jwt = require ('jsonwebtoken');
const User = require ('./models/user.model');

const authenticate = require ('./middlewares/authenticate');
const verifyToken = token => {
  return new Promise ((resolve, reject) => {
    jwt.verify (token, process.env.jwt_private_key, function (err, token) {
      console.log (token);
      if (err) return reject (err);
      return resolve (token);
    });
  });
};

const numberVerifyController = require ('./controllers/signup-login/number-verify.controller');

const singleProductController = require ('./controllers/singleproduct.controller');

const {
  register,
  login,
} = require ('./controllers/signup-login/user.controller');

const app = express ();

app.use (express.json ());

app.set ('view engine', 'ejs');

app.use ('/signup-login', numberVerifyController);

app.use ('/signup', register);

app.use ('/login', login);

app.use ('/single-product', singleProductController);

const mainProductController = require ('./controllers/mainProduct.controller');
app.use ('/mainProducts', mainProductController);

const wishlistController = require ('./controllers/wishlist.controller');
app.use ('/wishlists', wishlistController);

const productController = require ('./controllers/product.controller');
app.use ('/products', productController);

const bagController = require ('./controllers/bag.controller');
app.use ('/bags', bagController);

app.get ('/', async (req, res) => {
  return res.render ('index');
});

//controllers to get user from token and to update data

app.get ('/userData/:id', async (req, res) => {
  const user = await User.findById (req.params.id).lean ().exec ();

  return res.send (user);
});

app.get ('/*/user', authenticate, async (req, res) => {
  const user = req.user.user;

  return res.send (user);
});

app.patch ('/*/user/add', authenticate, async (req, res) => {
  try {
    console.log ('inside patch');

    let user = req.user.user;

    user = await User.findByIdAndUpdate (
      user._id,
      {$push: req.body},
      {
        new: true,
      }
    )
      .lean ()
      .exec ();

    return res.send (user);
  } catch (e) {
    return res.send (e.message);
  }
});

app.use (express.static ('public'));
module.exports = app;
