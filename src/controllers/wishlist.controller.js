const express = require ('express');
const Wishlist = require ('../models/wishlist.model');
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

router.delete ('/:id', async (req, res) => {
  try {
    const wishlist = await wishlist
      .findByIdAndDelete (req.params.id)
      .lean ()
      .exec ();

    return res.status (201).send ({wishlist: wishlist});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

module.exports = router;
