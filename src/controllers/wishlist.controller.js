const express = require ('express');
const authenticate = require ('../middlewares/authenticate');
const Wishlist = require ('../models/wishlist.model');
const User = require ('../models/user.model');
const router = express.Router ();

router.post ('', async (req, res) => {
  try {
    const wishlist = await Wishlist.create (req.body);

    return res.status (201).send ({wishlist: wishlist});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});
router.get ('', async (req, res) => {
  try {
    const wishlists = await Wishlist.find ().lean ().exec ();

    return res.render ('wishlist', {wishlists});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});
router.get ('/*/page/:id', async (req, res) => {
  try {
    // console.log ('inside wishlist controller');
    const wishlist = await Wishlist.findById (req.params.id).lean ().exec ();

    // return res.json (wishlist);
    return res.send (wishlist);
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

router.get ('/:id', async (req, res) => {
  try {
    const wishlist = await Wishlist.findById (req.params.id).lean ().exec ();

    // return res.json (wishlist);
    return res.render ('description.ejs', {wishlist});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

router.patch ('/:id', async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndUpdate (
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
      .lean ()
      .exec ();

    return res.status (201).send ({wishlist: wishlist});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

router.delete ('/:id', authenticate, async (req, res) => {
  try {
    // console.log ('indide delete');
    let user = req.user.user;
    console.log ('id', req.params.id);
    let newUser = await User.findById (user._id).find ().lean ().exec ();
    console.log ('newUser:', newUser);
    let wishlists = newUser[0].wishItems;


   
    let newarr = [];
    for (let i = 0; i < wishlists.length; i++) {
      // console.log (wishlists[i].toString ());
      if (wishlists[i].toString () !== req.params.id) {
        newarr.push (wishlists[i]);
      }
    }
    // console.log (newarr, 'newarr');

    user = await User.findByIdAndUpdate (
      user._id,
      {wishItems: newarr},
      {
        new: true,
      }
    )
      .lean ()
      .exec ();
    // console.log (user, 'finaluser');
    return res.status (201).send (user);
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

module.exports = router;
