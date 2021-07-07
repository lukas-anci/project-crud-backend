require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();

const PORT = 4000;
// middleware
app.use(morgan('dev'));
// leidzia req body gauti kaip json
app.use(express.json());

const mongoose = require('mongoose');
const ShopCategory = require('./src/models/shopCategory');

mongoose
  .connect(process.env.MONGO_CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log('Conneced to Mongoose');
  })
  .catch((err) => console.error(err.message));

app.get('/', (req, res) => {
  res.status(200).send('server works');
});

app.post('/api/shop/categories/new', (req, res) => {
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

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
