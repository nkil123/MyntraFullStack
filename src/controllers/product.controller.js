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
    console.log(product);

    // return res.json (product);
    return res.render ('description', { product: JSON.stringify(product)});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

router.get ('/category/:p1/:p2', async (req, res) => {
  try {
    // console.log (cat, req.query.parameter);
    console.log (req.params.p1, req.params.p2);
    let products = await Product.find ().lean ().exec ();
    console.log (req.params.p1, req.params.p2);
    products = products.filter (p => {
      console.log (req.params.p1, req.params.p2);
      return p[req.params.p1] === req.params.p2;
    });
    // return res.json (products);
    return res.render ('productsPage.ejs', {products});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});
router.get ('/price/:p1/:p2', async (req, res) => {
  try {
    // console.log (cat, req.query.parameter);
    // console.log (req.params.p1, req.params.p2);
    let products = await Product.find ().lean ().exec ();
    console.log (products);
    products = products.filter (p => {
      console.log (p.price);
      return p.price < req.params.p2 && p.price > req.params.p1;
    });

    console.log (products);

    // return res.json ({products})
    return res.render ('productsPage.ejs', {products});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

router.get ('/color/:color', async (req, res) => {
  try {
    // console.log (cat, req.query.parameter);
    // console.log (req.params.p1, req.params.p2);
    let products = await Product.find ().lean ().exec ();
    products = products.filter (p => {
      return p.color === req.params.color;
    });

    // return res.json ({products})
    return res.render ('productsPage.ejs', {products});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

router.get ('/discount/:discount', async (req, res) => {
  try {
    // console.log (cat, req.query.parameter);
    // console.log (req.params.p1, req.params.p2);
    let products = await Product.find ().lean ().exec ();
    products = products.filter (p => {
      return +p.discount >= +req.params.discount;
    });
    // console.log (products);
    // return res.json ({products});
    return res.render ('productsPage.ejs', {products});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

router.get ('/sort/:p', async (req, res) => {
  try {
    // console.log (cat, req.query.parameter);
    // console.log (req.params.p1, req.params.p2);
    let val = req.params.p;
    let products = await Product.find ({}).sort (val).lean ().exec ();
    // products = products.filter (p => {
    //   return +p.discount >= +req.params.discount;
    // });
    // console.log (products);
    // return res.json ({products});
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
