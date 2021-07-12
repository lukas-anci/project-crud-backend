const express = require('express');
const shopItem = require('../src/models/shopItem');
const router = express.Router();

// create new item
router.post('/api/shop/items/new', (req, res) => {
  console.log(req.body);

  // const newItemData = {
  //   title: 'Green hat',
  //   price: 99.99,
  //   salePrice: 49.9,

  //   image: 'acc_hat_01_',
  //   color: 'green',

  //   sizeQty: [
  //     { size: 'small', quantity: 10 },
  //     { size: 'medium', quantity: 10 },
  //     { size: 'large', quantity: 10 },
  //   ],
  //   images: [1, 2, 3, 4, 5],
  //   sku: 'hat_01',
  //   category: '60e593ada7aa681d4846ad99',
  // };
  const newItem = new shopItem(req.body);

  newItem
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// get all items

router.get('/api/shop/items', async (req, res) => {
  try {
    const items = await shopItem.find().populate('category');
    res.json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

// gauti single item

router.get('/api/shop/items/:id', async (req, res) => {
  try {
    const item = await shopItem.findById(req.params.id).populate('category');
    res.json(item);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
