const express = require('express');
const Cart = require('../src/models/cart');
const router = express.Router();

// get user cart

router.get('/api/shop/cart/:userId', (req, res) => {
  res.json(`You want to get cart of a user ${req.params.userId}`);
});

module.exports = router;
