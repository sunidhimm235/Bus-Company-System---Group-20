const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.route('/')
    .get(contactController.getAllContacts)
    .post(contactController.createNewContact)
    
router.route('/:name')
    .get(contactController.getContactByName)
    .delete(contactController.deleteContactByName)

module.exports = router;