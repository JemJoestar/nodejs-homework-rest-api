const {
  findContactById,
  getAllContacts,
  deleteContact,
  createContact,
  putContact,
  updateStatusContact,
} = require("../services/db-servises/contacts-db-servise");

// * ✅
const listContacts = async (owner, favoriteFilter, limits) => {
  const contactList = await getAllContacts(owner, favoriteFilter, limits);

  return contactList;
};

// * ✅
const getContactById = async (contactId, owner) => {
  const searchedContact = await findContactById(contactId, owner);

  return searchedContact;
};

// * ✅
const removeContact = async (contactId, owner) => {
  const deletedContact = await deleteContact(contactId,owner);
  console.log(deletedContact);

  return deletedContact;
};

// * ✅
const addContact = async (body) => {
  const newContact = await createContact(body);
  console.log(`newContact:`, newContact);

  return newContact;
};

// * ✅
const updateContact = async (contactId, body) => {
  const updatedContact = await putContact(contactId, body);
  console.log(`updatedContact:`, updatedContact);
  return updatedContact;
};

// * ✅
const addToFavourites = async (contactId, body) => {
  const updatedContact = await updateStatusContact(contactId, body);

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  addToFavourites,
};
