const {query} = require ('express');
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
router.get ('/:id', async (req, res) => {
  try {
    console.log ('id find');
    const product = await Product.findById (req.params.id).lean ().exec ();

    // return res.json (product);
    return res.render ('description.ejs', {product});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});
router.get ('/*/category/p1/p2', async (req, res) => {
  try {
    // console.log (cat, req.query.parameter);
    let products = await Product.find ().lean ().exec ();
    console.log (req.params.p1, req.params.p2);
    products = products.filter (p => {
      return p[req.params.p1] === req.params.p2;
    });
    console.log (products);
    return res.json ({products});
    // console.log (products);
    return res.render ('productsPage.ejs', {products});
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
