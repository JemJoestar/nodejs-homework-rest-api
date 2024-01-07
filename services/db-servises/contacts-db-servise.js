const { default: mongoose, Schema } = require("mongoose");

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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
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

exports.createContact = async (body) => {
  console.log(`body:`, body);
  const newContact = new Contact(body);

  saveContact(newContact);

  return newContact;
};

exports.getAllContacts = async (owner, favorite, limits) => {
  console.log(`favorite:`, favorite);
  const { page, limit } = limits;
  const contactList = favorite
    ? await Contact.find({ owner, favorite })
        .limit(limit)
        .skip((page - 1) * limit)
    : await Contact.find({ owner })
        .limit(limit)
        .skip((page - 1) * limit);
  return contactList;
};

exports.findContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

exports.deleteContact = async (contactId) => {
  const removedContact = await Contact.findByIdAndDelete(contactId);
  return removedContact;
};

exports.putContact = async (contactId, body) => {
  const contactToUpdate = await Contact.findById(contactId);
  console.log(`body:`, body);
  console.log(`contactToUpdate:`, contactToUpdate);
  for (const i in body) {
    contactToUpdate[i] = body[i];
  }
  await Contact.findByIdAndUpdate(contactId, contactToUpdate);
  return contactToUpdate;
};

exports.updateStatusContact = async (contactId, body) => {
  try {
    const contactToUpdate = await Contact.findById(contactId);
    contactToUpdate.favorite = body.favorite;
    contactToUpdate.save();
    return contactToUpdate;
  } catch (e) {
    return null;
  }
};
