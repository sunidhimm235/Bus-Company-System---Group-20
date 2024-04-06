require('dotenv').config(); // Make sure to require this if you're using dotenv for environment variables
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secretKey = process.env.SECRET_KEY || 'mysecretkey12345'; 

const handleError = (res, error) => {
  console.error(error);
  return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
};

// register new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User successfully created' });
  } 
  catch (error) {
    handleError(res, error);
  }
});

// user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    console.log(secretKey)

    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, { expiresIn: '1h' });

    
    res.json({ success: true, message: 'Login successful', token, username: user.username });
  } 
  catch (error) {
    handleError(res, error);
  }
});

module.exports = router;