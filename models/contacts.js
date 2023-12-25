const { findContactById, getAllContacts, deleteContact, createContact, putContact, updateStatusContact } = require("../services/db-service");


// * ✅
const listContacts = async () => {
  const contactList = await getAllContacts();

  return contactList;
};

// * ✅
const getContactById = async (contactId) => {
  const searchedContact = await findContactById(contactId);

  return searchedContact;
};

// * ✅
const removeContact = async (contactId) => {
  
  const deletedContact = await deleteContact(contactId)
  console.log(deletedContact)


  return deletedContact;
};

// * ✅
const addContact = async (body) => {
  const newContact = await createContact(body)
  console.log(`newContact:`, newContact)


  return newContact;
};

// * ✅
const updateContact = async (contactId, body) => {
  const updatedContact = await putContact(contactId, body)
  console.log(`updatedContact:`, updatedContact)
  return updatedContact

};

//! X 
const addToFavourites = async (contactId, body) =>{
  const updatedContact = await updateStatusContact(contactId, body)

  return updatedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  addToFavourites
};
