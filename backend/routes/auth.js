const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // check for existing user by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User successfully created' });
  } catch (error) {
    res.status(500).json({ message: 'Error while creating user', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    const isValid = user && await bcrypt.compare(req.body.password, user.password);

    if (!isValid) {
      return res.status(400).send('Invalid credentials. Please try again.');
    }

    res.send('Login success.');
  } 
  
  catch (error) {
    res.status(500).send("Error logging in.");
  }
});

module.exports = router;