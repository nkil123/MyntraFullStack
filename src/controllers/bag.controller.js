const express = require ('express');
const authenticate = require ('../middlewares/authenticate');
const Bag = require ('../models/bag.model');
const router = express.Router ();

router.post ('', async (req, res) => {
  try {
    const bag = await Bag.create (req.body);

    return res.status (201).send ({bag: bag});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});
router.get ('', async (req, res) => {
  try {
    const bags = await Bag.find ().lean ().exec ();

    // return res.json (bags);
    return res.render ('bag', {bags: JSON.stringify (bags)});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

router.get ('/address', async (req, res) => {
  try {
    

    
    return res.render ('address');
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});


router.get ('/payment', async (req, res) => {
  try {
    

    
    return res.render ('payment');
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

router.get ('/thankyou', async (req, res) => {
  try {
    

    
    return res.render ('thankyou');
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});


router.get ('/:id', async (req, res) => {
  try {
    const bag = await Bag.findById (req.params.id).lean ().exec ();

    // return res.json (bag);
    return res.render ('description.ejs', {bag});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

router.patch ('/:id', async (req, res) => {
  try {
    const bag = await Bag.findByIdAndUpdate (req.params.id, req.body, {
      new: true,
    })
      .lean ()
      .exec ();

    return res.status (201).send ({bag: bag});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

router.delete ('/:id', async (req, res) => {
  try {
    const bag = await Bag.findByIdAndDelete (req.params.id).lean ().exec ();

    return res.status (201).send ({bag: bag});
  } catch (e) {
    return res.status (500).json ({message: e.message, satus: 'Failed'});
  }
});

module.exports = router;
