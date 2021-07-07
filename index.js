require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();

const PORT = 4000;
// middleware
app.use(morgan('dev'));

const mongoose = require('mongoose');

app.get('/', (req, res) => {
  res.status(200).send('server works');
});

mongoose
  .connect(process.env.MONGO_CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log('Conneced to Mongoose');
  })
  .catch((err) => console.error(err.message));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
