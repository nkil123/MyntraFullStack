const express = require ('express');
const MainProduct = require ('../models/mainProduct.model');
const Product = require ('../models/product.model');
const router = express.Router ();
const port = process.env.PORT || 2233;
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
    const mainProducts = await MainProduct.find ()
      .populate ('products')
      .lean ()
      .exec ();

    return res.render ('index', {mainProducts});

    // return res.status (201).send ({mainProduct: mainProduct});
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
    // console.log (mainProducts);
    let products = mainProducts[0].products;
    // return res.json (mainProducts);
    return res.render ('productsPage', {products});
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

// router.get("/products", async (req, res)=>{
//   try {
//       const page = +req.query.page || 1;
//        const size = +req.query.limit || 20;
//        const offset = (page - 1)*size;
//         const mainProducts = await Mainproduct.find({}).populate ('products').skip(offset).limit(size).lean().exec();
//           let products = mainProducts[0].products;
//             return res.render ('productsPage', {products});
//   } catch(e){
//       return res.status(500).json({message:e.message, status: "Failed"});
//   }
// });

module.exports = router;
