const express = require('express');
const shopItem = require('../src/models/shopItem');
const router = express.Router();

// create new item

// sukurti nauja item
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

// gauti visus items

// gauti single item
module.exports = router;
