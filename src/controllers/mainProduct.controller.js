const express = require ('express');
const MainProduct = require ('../models/mainProduct.model');
const router = express.Router ();

router.post ('', async (req, res) => {
  try {
    const mainProduct = await MainProduct.create (req.body);

    return res.status (201).send ({mainProduct: mainProduct});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});
router.get ('', async (req, res) => {
  try {
    const mainProduct = await MainProduct.find ()
      .populate ('products')
      .lean ()
      .exec ();

    return res.status (201).send ({mainProduct: mainProduct});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

router.get ('/products', async (req, res) => {
  try {
    const mainProducts = await MainProduct.find ()
      .populate ('products')
      .lean ()
      .exec ();
    let products = mainProducts[0].products;

    return res.render ('productsPage', {products});
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

module.exports = router;
