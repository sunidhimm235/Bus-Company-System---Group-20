const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  try {
    const { 
        username, email, password, role 
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ 
        username, email, password: hashedPassword, role 
    });
    await newUser.save();

    res.status(201).json({ 
        message: 'User successfully created' 
    });
  }

  catch (error) {
    res.status(500).json({ message: 'Error while creating user', error: error.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { 
        email, password 
    } = req.body;
    
    const user = await User.findOne({ 
        email 
    });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials, try again' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, userId: user._id, role: user.role });
  } 
  
  catch (error) {
    res.status(500).json({ 
        message: 'Error logging in', error: error.message 
    });
  }
});

module.exports = router;