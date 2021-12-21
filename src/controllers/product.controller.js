const express = require ('express');
const authenticate = require ('../middlewares/authenticate');
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
    // console.log ('inside this');
    const page = +req.query.page || 1;
    const size = +req.query.limit || 20;
    const offset = (page - 1) * size;
    const products = await Product.find ()
      .skip (offset)
      .limit (size)
      .lean ()
      .exec ();

    return res.render ('productsPage.ejs', {products});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

router.get ('/*/page', async (req, res) => {
  try {
    console.log ('inside page');
    console.log (req.query);
    const page = +req.query.page || 1;
    const size = +req.query.limit || 15;
    const offset = (page - 1) * size;
    // console.log (page, size, offset);

    const products = await Product.find ({ageGroup: 'Women'})
      .skip (offset)
      .limit (size)
      .lean ()
      .exec ();
    return res.render ('productsPage.ejs', {products});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});



router.get ('/category/:p1/:p2', async (req, res) => {
  try {
    console.log ('inside category');
    // console.log (cat, req.query.parameter);
    // console.log (req.params.p1, req.params.p2);
    let page=+req.query.page || 1;
    let size=15;
    let skip = (page-1)*size;

    let products = await Product.find ({gender: req.params.p2}).skip(skip).limit(size).lean ().exec ();
    // console.log (req.params.p1, req.params.p2);
    // products = products.filter (p => {
    //   console.log (req.params.p1, req.params.p2);
    //   return p[req.params.p1] === req.params.p2;
    // });
    // return res.json (products);
    let totalPages = Math.ceil(await Product.find ({gender: req.params.p2}).count()/size);
    console.log(totalPages)
    return res.render ('productsPage.ejs', {products:products,gender: JSON.stringify(req.params.p2), totalPages,page});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

router.get ('/:id', async (req, res) => {
  try {
    // console.log ('id find');
    const product = await Product.findById (req.params.id).lean ().exec ();
    // console.log (product);

    // return res.json (product);
    return res.render ('description', {product: JSON.stringify (product)});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'aaaaa  Failed'});
  }
});


router.get ('/bags/:id', authenticate, async (req, res) => {
  try {
    console.log ('inside bags');
    const product = await Product.findById (req.params.id).lean ().exec ();
    // console.log (product);

    return res.send (product);
    // return res.render ('description', {product: JSON.stringify (product)});
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
      // console.log (p.price);
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

router.get ('/search/:val', async (req, res) => {
  try {
    let searchVal;
    if (
      req.params.val == 'men' ||
      req.params.val === 'Men' ||
      req.params.val == 'mens' ||
      req.params.val == 'Mens'
    ) {
      searchVal = 'Men';
    }
    if (
      req.params.val == 'women' ||
      req.params.val === 'Women' ||
      req.params.val == 'womens' ||
      req.params.val == 'Womens'
    ) {
      searchVal = 'Women';
    }
    if (
      req.params.val == 'girls' ||
      req.params.val === 'Girls' ||
      req.params.val == 'girl' ||
      req.params.val == 'Girl'
    ) {
      searchVal = 'Girls';
    }
    if (
      req.params.val == 'boys' ||
      req.params.val === 'Boys' ||
      req.params.val == 'boy' ||
      req.params.val == 'Boy'
    ) {
      searchVal = 'Boys';
    }
    const products = await Product.find ({ageGroup: searchVal}).lean ().exec ();

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
