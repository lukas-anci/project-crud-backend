const express = require('express');
const shopItem = require('../src/models/shopItem');
const router = express.Router();
const newItemData = require('../src/models/stock');

// create new item
router.post('/api/shop/items/new', (req, res) => {
  console.log(req.body);

  const newItem = new shopItem(newItemData[4]);

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

// get item by category
// find {category:catId}
router.get('/api/shop/items/category/:catId', async (req, res) => {
  // res.json('sending data');

  try {
    const items = await shopItem
      .find({ category: req.params.catId })
      .populate('category');
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
