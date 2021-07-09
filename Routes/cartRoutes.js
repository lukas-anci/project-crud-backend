const express = require('express');
const Cart = require('../src/models/cart');
const router = express.Router();

// get user cart

router.get('/api/shop/cart/:userId', (req, res) => {
  res.json(`You want to get cart of a user ${req.params.userId}`);
});

// add item to cart

router.post('/api/shop/cart/:userId', async (req, res) => {
  console.log('got item to add to cart');
  console.log(req.body);

  try {
    // if cart exists
    const currentCart = await Cart.findOne({
      userId: req.params.userId,
    }).exec();
    console.log('currentCart', Boolean(currentCart));

    // jei jau yra toks cart tai mes norim prideti prie cart objektu

    if (!currentCart) {
      const newCart = new Cart({ userId: req.params.userId, cart: [req.body] });
      const result = await newCart.save();
      res.json({ msg: 'cart created', result });
    } else {
      // count nelygu nuliui cartas siam vartotojui egzistuoja norim prideti i carta
      const currentCartArr = currentCart.cart;
      currentCartArr.push(req.body);
      await Cart.updateOne(
        { userId: req.params.userId },
        { cart: currentCartArr }
      );
      res.json({ msg: 'now in cart', currentCart });
    }
    // res.json('testing');
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
