require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 4000;
// middleware
app.use(morgan('dev'));
// leidzia req body gauti kaip json
app.use(express.json());
app.use(cors());

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

// routes

const catRoutes = require('./routes/catRoutes');
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/', catRoutes);
app.use('/', itemRoutes);
app.use('/', userRoutes);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
