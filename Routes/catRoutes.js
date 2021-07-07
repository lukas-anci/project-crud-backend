const express = require('express');
const ShopCategory = require('../src/models/shopCategory');
const router = express.Router();

router.get('/api/shop/categories', (req, res) => {
  ShopCategory.find()
    .then((categories) => res.json(categories))
    .catch((err) => res.sendStatus(500));
});

router.post('/api/shop/categories/new', (req, res) => {
  // get user title
  console.log(req.body);
  const titleFromUser = req.body.title;
  if (!titleFromUser) return res.status(400).json('no title');

  // get title, create new category
  const newCat = new ShopCategory({ title: titleFromUser });
  newCat
    .save()
    .then((result) => res.json(['category created', result]))
    .catch((err) => res.status(500).json('internal error'));
});

module.exports = router;
