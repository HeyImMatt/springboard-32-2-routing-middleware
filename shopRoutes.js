const express = require("express");
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

router.get('/', (req,res) => {
  res.json({items})
});

router.post('/', (req, res, next) => {
  try {
    console.log(req.body)
    if(!req.body.name || !req.body.price) throw new ExpressError('Item name and price required', 400);
    const newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem);
    return res.status(201).json({added: newItem});
  } catch (e) {
    return next(e);
  }
})

module.exports = router;