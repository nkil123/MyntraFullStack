const express = require ('express');

const router = express.Router ();

router.get ('', (req, res) => {
  return res.render ('login.ejs');
});

router.get ('/numberverified', (req, res) => {
  return res.render ('numberverified.ejs');
});

router.get ('/signup', (req, res) => {
  return res.render ('signup.ejs');
});

router.get ('/login', (req, res) => {
  return res.render ('login_validation.ejs');
});

module.exports = router;
