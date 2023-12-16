const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Jemjoesar:qwertyuiop123456789@contactsapi.swnwnx1.mongodb.net/db-contacts"
    );
    console.log("Success");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("contact", ContactSchema);

const saveContact = async (contact) => {
  try {
    await contact.save();
  } catch (error) {
    console.log(`error:`, error);
  }
};

const createContact = async (body) => {
  const newContact = new Contact(body);

  saveContact(newContact);

  return newContact;
};

const getAllContacts = async () => {
  const contactList = await Contact.find();
  return contactList;
};

const findContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

const deleteContact = async (contactId) => {
  const removedContact = await Contact.findByIdAndDelete(contactId);
  return removedContact;
};

const putContact = async (contactId, body) => {
  const contactToUpdate = await Contact.findById(contactId);
  for (const i in body) {
    contactToUpdate[i] = body[i];
  }
  await Contact.findByIdAndUpdate(contactId, contactToUpdate);
  return contactToUpdate;
};

const updateStatusContact = async (contactId, body) => {
  try {
    const contactToUpdate = await Contact.findById(contactId);
    contactToUpdate.favorite = body.favorite;
    contactToUpdate.save();
    return contactToUpdate;
  } catch (e) {
    return null;
  }
};

module.exports = {
  connectDB,
  createContact,
  saveContact,
  getAllContacts,
  findContactById,
  deleteContact,
  putContact,
  updateStatusContact,
};
