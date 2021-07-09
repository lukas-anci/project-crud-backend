const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
    },
    image: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    sizeQty: {
      type: [{ size: String, quantity: Number }],
      required: true,
    },
    images: {
      type: [Number],
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'shopcategories',
    },
  },
  { timestamps: true } /// adds timestamps
);
const shopItem = mongoose.model('shopItem', shopItemSchema);
module.exports = shopItem;
