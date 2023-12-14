const fs = require("fs").promises;
const uuid = require("uuid").v4;

// * ✅
const listContacts = async () => {
  const contactList = JSON.parse(
    await fs.readFile("./models/contacts.json", () => {})
  );
  return contactList;
};

// * ✅
const getContactById = async (contactId) => {
  const contactList = await listContacts();
  const searchedContact = contactList.find((item) => item.id === contactId);

  console.log(`searchedContact:`, searchedContact);

  return searchedContact;
};

// * ✅
const removeContact = async (contactId) => {
  const contactList = await listContacts();

  const updatedContactList = contactList.filter(
    (item) => item.id !== contactId
  );

  if (contactList.length === updatedContactList.length) {
    return false;
  }

  fs.writeFile("./models/contacts.json", JSON.stringify(updatedContactList));
  return true;
};

// * ✅
const addContact = async (body) => {
  const contactList = await listContacts();
  const newContact = { id: uuid(), ...body };

  contactList.push(newContact);

  console.log(`newContact:`, newContact);

  fs.writeFile("./models/contacts.json", JSON.stringify(contactList));

  return newContact;
};

// * ✅
const updateContact = async (contactId, body) => {
  const contactList = await listContacts();

  console.log(`contactList:`, contactList);
  let updateIndex
  const contactToUpdate = contactList.find((item, index) => {
    if (item.id === contactId) {
      console.log(`item:`, item)
      updateIndex = index
      return item;
    }

    return false;
  });

  if (!contactToUpdate) {
    return {};
  }
  const updatedContact = { ...contactToUpdate, ...body };

  contactList.splice(updateIndex, 1, updatedContact);

  fs.writeFile("./models/contacts.json", JSON.stringify(contactList));

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
