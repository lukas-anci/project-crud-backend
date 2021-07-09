const express = require('express');
const Cart = require('../src/models/cart');
const router = express.Router();

// get user cart

router.get('/api/shop/cart/:userId', (req, res) => {
  res.json(`You want to get cart of a user ${req.params.userId}`);
});

// add item to cart

router.post('/api/shop/cart/:userId', (req, res) => {
  res.json('yo yo add items to cart');
});

module.exports = router;
