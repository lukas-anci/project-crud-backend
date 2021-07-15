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

// create update cart quantity PUT route /api/shop/cart/:userId
// gauti atsakyma json pavidalu req.body arba isloginti req.body

router.put('/api/shop/cart/:userId', async (req, res) => {
  // res.json(req.body);

  console.log('req.body', req.body);
  console.log(`cart id: ${req.body.cartItemId}`);

  const userId = req.params.userId;
  const { cartItemId, newQty } = req.body;

  // susirasti cart pagal userId
  const foundCartObj = await Cart.findOne({ userId }).exec();
  console.log('foundCartObj', foundCartObj.cart);

  // paieskoti carte item pagal cartId

  const foundCartItemToBeUpdated = foundCartObj.cart.find(
    ({ _id }) => _id == cartItemId
  );
  console.log('foundCartItemToBeUpdated', foundCartItemToBeUpdated);
  foundCartItemToBeUpdated.quantity = newQty;
  // autnaujinti kieki to itemo pagal newQty

  // const saveResult = await foundCartObj.save();
  foundCartObj.save((error, saveResult) => {
    if (error) console.log('error', error);
    console.log('saveResult', saveResult);
    res.json({ msg: 'atnaujinimas in progreess', saveResult });
  });
});

// add item to cart

router.post('/api/shop/cart/:userId', async (req, res) => {
  // console.log('add to cart route');
  // console.log(req.body);
  // console.log('we need cartItem');
  // console.log(shopItemToCart(req.body));

  // res.status(200).json();
  // return;

  try {
    // ar toks krepselis existuoja
    const currentCart = await Cart.findOne({
      userId: req.params.userId,
    }).exec();
    console.log(' currentCart', currentCart);
    // jei krepselio siam vartotojui nera sukurta
    if (!currentCart) {
      // console.log('newcart');
      const newCart = await createNewCart(req.params.userId, req.body);
      res.json({ msg: 'created a cart', newCart: newCart });
    } else {
      // vartotojas jau turi krepseli
      // arba padidinti kieki vienetu jei ta pati preke arba prideti nauja i krepseli
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
      // sumazinam item quantity kuris buvo nupirktas

      updateShopItemStock(req.body._id, -1);
      res.json({ msg: 'add item to cart', currentCart });
    }

    // res.json('testing');
  } catch (err) {
    res.json(err);
  }
});

// helper functions

async function updateShopItemStock(shopItemId, difference) {
  console.log('updateShopItemStock');
  console.log({ shopItemId, difference });
}

async function createNewCart(userId, body) {
  const newCart = new Cart({ userId: userId, cart: [shopItemToCart(body)] });

  await newCart.save();
  return newCart.cart;
}

function increaseQtyOrAddNewItem(didWeFindThisItem, currentCartArr, body) {
  if (didWeFindThisItem) {
    // qty ++
    didWeFindThisItem.quantity++;
  } else {
    currentCartArr.push(shopItemToCart(body));
  }
}

function isItemVariantInCartAlready(currentCartArr, body) {
  return currentCartArr.find((ci) => ci.itemId == body._id);
}

function shopItemToCart(shopItem) {
  // shop item
  // {
  //   images: [ 1, 2, 3, 4, 5 ],
  //   _id: '60ee78f41b369e54289c231b',
  //   title: 'Green hat',
  //   price: 99.99,
  //   salePrice: 49.9,
  //   image: 'acc_hat_01_',
  //   color: 'green',
  //   size: 'small',
  //   quantity: 10,
  //   sku: 'hat_01',
  //   category: 4556
  // }

  // cart item

  // cart: [
  //   {
  //     title: reqString,
  //     image: reqString,
  //     price: reqNumber,
  //     color: reqString,
  //     size: reqString,
  //     sku: reqString,
  //     itemId: 54654,
  //     quantity: 1,
  //   },
  // ],
  const {
    title,
    image,
    price,
    salePrice,
    color,
    size,
    sku,
    _id: itemId,
  } = shopItem;
  return {
    title,
    image,
    price: salePrice || price,
    color,
    size,
    sku,
    itemId,
  };
}

module.exports = router;
