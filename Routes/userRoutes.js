const express = require('express');
const user = require('../src/models/user');
const router = express.Router();

// create newUser

router.post('/api/user/new', (req, res) => {
  const newUserData = {
    name: 'John Dow',
    email: 'john@doe.com',
    password: 'bestpasswordever',
  };

  const newUser = new user(newUserData);

  newUser
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// get all users

router.get('/api/users', async (req, res) => {
  try {
    const users = await user.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single user
router.get('/api/users/:id', async (req, res) => {
  try {
    const userFound = await user.findById(req.params.id);
    res.json(userFound);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
