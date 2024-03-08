const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs'); 

// GET all users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();

    if (!users.length) {
        return res.status(404).json({ message: 'No users found' });
    }

    res.json(users);
});

// Create new user
const createNewUser = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !password || !email || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const duplicateUsername = await User.findOne({ username }).lean();
    const duplicateEmail = await User.findOne({ email }).lean();

    if (duplicateUsername || duplicateEmail) {
        return res.status(409).json({ message: 'Duplicate username or email' });
    }

    // hash password with salt rounds
    const hashedPwd = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPwd, role });

    user ? res.status(201).json({ message: `New user ${username} created` }) : res.status(400).json({ message: 'Invalid user data received' });
});

// Update user
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, role, active, password, email } = req.body;

    if (!id || !username || !role || typeof active !== 'boolean' || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // check for duplicate username excluding current user
    const duplicateUsername = await User.findOne({ username, _id: { $ne: id } }).lean();
    if (duplicateUsername) {
        return res.status(409).json({ message: 'Duplicate username' });
    }

    user.username = username;
    user.role = role;
    user.active = active;
    user.email = email;

    if (password) {
        // hash new password with salt rounds before saving
        user.password = await bcrypt.hash(password, 8);
    }

    const updatedUser = await user.save();
    res.json({ message: `${updatedUser.username} updated` });
});

// Delete a user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'User ID required' });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();
    res.json({ message: `User ${user.username} deleted` });
});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
};