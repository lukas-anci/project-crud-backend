const express = require('express');
const Cart = require('../src/models/cart');
const shopItem = require('../src/models/shopItem');
const router = express.Router();

// get count of carts of a user
router.get('/api/shop/cart/count/:userId', async (req, res) => {
  // console.log('kkk');
  const allCarts = await Cart.find();
  console.log('userIds', req.params.userId);
  console.log('allcarts', allCarts);
  const currentUserCart = await allCarts.find(
    (u) => u.userId == req.params.userId
  );
  // console.log('kkk2', currentUserCart);

  // currentUserCartObj = Cart.findOne({ userId: req.params.userId });
  if (currentUserCart && currentUserCart.cart) {
    return res.json(currentUserCart.cart.length);
  }
  res.status(200).json(0);
});
// get user cart

router.get('/api/shop/cart/:userId', async (req, res) => {
  // res.json(`You want to get cart of a user ${req.params.userId}`);

  try {
    const allCarts = await Cart.find();
    // find current user cart
    const currentUserCart = allCarts.find((u) => u.userId == req.params.userId);
    // truksta title, image
    // gauti itema pagal id

    const fullDetailsCartItem = currentUserCart.map((cartItem) => {
      // surandam konkretu itema pagal id
      const currentItem = shopItem.findById(cartItem.itemId);
      console.log('currentItem', currentItem);
      return {
        ...cartItem,
        title: currentItem.title,
      };
    });
    res.json(fullDetailsCartItem);
  } catch (err) {
    res.json(err);
  }
});

// add item to cart

router.post('/api/shop/cart/:userId', async (req, res) => {
  console.log('got item to add to cart');
  // console.log(req.body);

  try {
    //
    // ar toks krepselis existuoja
    const currentCart = await Cart.findOne({
      userId: req.params.userId,
    }).exec();
    console.log(' currentCart', Boolean(currentCart));
    // jei jau yra toks cart tai mes norim prideti prie cart objektu
    if (!currentCart) {
      const newCart = new Cart({ userId: req.params.userId, cart: [req.body] });
      const result = await newCart.save();
      res.json({ msg: 'created a cart', result });
    } else {
      // count nelygu nuliui cartas siam vartotojui egzistuoja norim prideti i cart
      // currentCartArr esamas krepselis dv
      // req.body = naujas item i krepseli
      const currentCartArr = currentCart.cart;
      const isItemInCartAlready = currentCartArr.find(
        (ci) => ci.itemId == req.body.itemId && ci.size === req.body.size
      );
      if (isItemInCartAlready) {
        // qty ++
        isItemInCartAlready.quantity++;
        console.log('qty++');
      } else {
        currentCartArr.push(req.body);
        console.log('item push');
      }
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
