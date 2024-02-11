const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

//@desc GET all users
//@route GET /users
//@access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

//@desc create new user
//@route POST /users
//@access private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, email, password, roles } = req.body

    // Confirm data
    if (!username || !password || !email || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicates
    const duplicateUsername = await User.findOne({ username }).lean().exec()
    const duplicateEmail = await User.findOne({ email }).lean().exec()

    if (duplicateUsername) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    if (duplicateEmail) {
        return res.status(409).json({ message: 'Duplicate email' })
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10)

    const userObject = {
        username,
        email,
        password: hashedPwd,
        role
    }

    // Create and store new user
    const user = await User.create(userObject)

    if (user) {
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

//@desc Update user
//@route PATCH /users
//@access private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, role, active, password, email } = req.body

    // Confirm data
    if (!id || !username || !Array.isArray(role) || !role.length || typeof active !== 'boolean' || !email) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const duplicate = await User.findOne({ username }).lean().exec()
    if (duplicate && duplicate._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.role = role
    user.active = active
    user.email = email

    if (password) {
        user.password = await bcrypt.hash(password, 10)
    }

    if (email) {
        user.email = email
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

//@desc Delete a user
//@route DELETE /users
//@access private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body
    
    if (!id) {
        res.status(400).json({ message: 'User ID required' })
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result.id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}