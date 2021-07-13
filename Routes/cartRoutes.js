const express = require('express');
const Cart = require('../src/models/cart');
const shopItem = require('../src/models/shopItem');
const router = express.Router();

// get count of carts of a user
router.get('/api/shop/cart/count/:userId', async (req, res) => {
  // console.log('kkk');
  try {
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
  } catch (err) {
    res.json(err);
  }
});
// get user cart

router.get('/api/shop/cart/:userId', async (req, res) => {
  console.log('get user cart function ran');
  // res.json(`You want to get cart of a user ${}`);
  try {
    // we find all carts of all users
    const allCarts = await Cart.find();
    console.log(allCarts);
    // find current user cart
    const currentUserCart = allCarts.find((u) => u.userId == req.params.userId);

    res.json(currentUserCart.cart);
  } catch (err) {
    res.json(err);
  }
});

// add item to cart

router.post('/api/shop/cart/:userId', async (req, res) => {
  try {
    // ar toks krepselis existuoja
    const currentCart = await Cart.findOne({
      userId: req.params.userId,
    }).exec();
    console.log(' currentCart', Boolean(currentCart));
    // jei jau yra toks cart tai mes norim prideti prie cart objektu
    if (!currentCart) {
      console.log('newcart');
      const newCart = await createNewCart(req.params.userId, req.body);
      res.json({ msg: 'created a cart', newCart: newCart });
    } else {
      // count nelygu nuliui cartas siam vartotojui egzistuoja norim prideti i cart
      // currentCartArr esamas krepselis db
      // req.body = naujas item i krepseli
      const currentCartArr = currentCart.cart;

      increaseQtyOrAddNewItem(
        isItemVariantInCartAlready(currentCartArr, req.body),
        currentCartArr,
        req.body
      );

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

// helper functions
async function createNewCart(userId, body) {
  const newCart = new Cart({ userId: userId, cart: [body] });
  await newCart.save();
  return newCart.cart;
}

function increaseQtyOrAddNewItem(isItemInCartAlready, currentCartArr, body) {
  if (isItemInCartAlready) {
    // qty ++
    isItemInCartAlready.quantity++;
  } else {
    currentCartArr.push(body);
  }
}

function isItemVariantInCartAlready(currentCartArr, body) {
  return currentCartArr.find(
    (ci) => ci.itemId == body.itemId && ci.size === body.size
  );
}

module.exports = router;
