const express = require('express');
const shopItem = require('../src/models/shopItem');
const router = express.Router();

// create new item
router.post('/api/shop/items/new', (req, res) => {
  console.log(req.body);

  const newItemData = {
    title: 'Autumn best',
    price: 99.99,

    image: 'foot_autumn_01_',
    color: 'green',
    size: 'normal',
    sizeQty: [
      { size: 'small', quantity: 3 },
      { size: 'medium', quantity: 3 },
      { size: 'large', quantity: 3 },
    ],
    images: [1, 2, 3, 4],
    sku: 'autumn_01',
    category: '60e593ada7aa681d4846ad99',
  };
  const newItem = new shopItem(newItemData);

  newItem
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// get all items

router.get('/api/shop/items', async (req, res) => {
  try {
    const items = await shopItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json('internal error');
  }
});

// gauti single item
module.exports = router;
