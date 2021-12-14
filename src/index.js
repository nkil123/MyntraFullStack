const express = require ('express');

const app = express ();

app.use (express.json ());

app.set ('view engine', 'ejs');

module.exports = app;
