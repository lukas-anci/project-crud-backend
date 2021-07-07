require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();

const PORT = 4000;
// middleware
app.use(morgan('dev'));
app.use(express.json());

const mongoose = require('mongoose');

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
  res.json('this is categories api to create');
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
