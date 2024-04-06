const Contact = require('../models/Contact');
const asyncHandler = require('express-async-handler');


// Create new contact
const createNewContact = asyncHandler(async (req, res) => {
    const { name, email, phone, message } = req.body;
  
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const contact = await Contact.create({ name, email, phone, message });
  
    contact
      ? res.status(201).json({ message: `New contact ${name} created` })
      : res.status(400).json({ message: 'Invalid contact data received' });
});

// GET all contacts
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().lean();

  if (!contacts.length) {
    return res.status(404).json({ message: 'No contacts found' });
  }

  res.json(contacts);
});
  
const getContactByName = asyncHandler(async (req, res) => {
    try 
    {
        const { name } = req.params;
        const contact = await Contact.findOne({ name });
        if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(contact);
    } 
    catch (error)
    {
        console.error('Error getting contact by name:', error);
        res.status(500).json({ message: 'Error fetching contact' });
    }
});
  
const deleteContactByName = asyncHandler(async (req, res) => {
    try 
    {
        const { name } = req.params;
        const deletedContact = await Contact.findByIdAndDelete(name);
        if (!deletedContact) {
        return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) 
    {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Error deleting contact' });
    }
});

module.exports = {
    createNewContact,
    getAllContacts,
    getContactByName,
    deleteContactByName
};