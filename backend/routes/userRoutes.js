const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.route('/')
  .get(usersController.getAllUsers) // fetch all users
  .post(usersController.createNewUser) // create new user

// for updating and deleting a user, the specified user ID is needed 
// these operations should be on a route that has user's ID
router.route('/:id')
  .patch(usersController.updateUser) // update a user
  .delete(usersController.deleteUser) // delete a user
  .get(usersController.getUserById); // get a user by ID

module.exports = router;