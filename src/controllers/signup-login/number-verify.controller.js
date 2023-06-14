const express = require ('express');

const router = express.Router ();

router.get ('', (req, res) => {
  return res.render ('login.ejs');
});

router.get ('/numberverified', (req, res) => {
  return res.render ('numberverified.ejs');
});


module.exports = router;
