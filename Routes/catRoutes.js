const express = require('express');
const router = express.Router;

router.get('/api/shop/categories', (req, res) => {
  res.json('you are about to get the categories');
});

module.exports = router;
