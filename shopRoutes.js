const express = require("express");
const { listen } = require("./app");
const router = new express.Router();
const ExpressError = require("./expressError");
const items = require("./fakeDb");

items.push(  {
  name: 'popsicle', 
  price: 1.45
},
{
  name: 'cheerios', 
  price: 3.40
});

router.get("/", (req,res) => {
  res.json({items})
});

module.exports = router;