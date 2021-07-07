const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopCatSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const ShopCategory = mongoose.model('shopcategories', shopCatSchema);
module.exports = ShopCategory;
