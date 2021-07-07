const express = require('express');
const morgan = require('morgan');
const app = express();

const PORT = 4000;
// middleware
app.use(morgan('dev'));

const mongoose = require('mongoose');

const { mongoDbString } = require('./src/config/config');

app.get('/', (req, res) => {
  res.status(200).send('server works');
});

mongoose
  .connect(mongoDbString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('Conneced to Mongoose');
  })
  .catch((err) => console.error(err.message));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
