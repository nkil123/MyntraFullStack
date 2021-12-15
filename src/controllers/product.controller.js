const express = require ('express');
const Product = require ('../models/product.model');
const router = express.Router ();

router.post ('', async (req, res) => {
  try {
    const product = await Product.create (req.body);

    return res.status (201).send ({product: product});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});
router.get ('', async (req, res) => {
  try {
    const products = await Product.find ().lean ().exec ();

    return res.status (201).send ({products: products});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});
router.patch ('/:id', async (req, res) => {
  try {
    const product = await Product.findById (req.params.id).lean ().exec ();

    return res.render ('description.ejs', {product});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

router.patch ('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate (req.params.id, req.body, {
      new: true,
    })
      .lean ()
      .exec ();

    return res.status (201).send ({product: product});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

router.delete ('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete (req.params.id)
      .lean ()
      .exec ();

    return res.status (201).send ({product: product});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

module.exports = router;
