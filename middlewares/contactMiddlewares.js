const {
  findContactById,
} = require("../services/db-servises/contacts-db-servise");
const { checkToken } = require("../services/jwt-servise");

exports.protect = async (req, res, next) => {
  try {
    const userId = await checkToken(req.headers.authorization.split(" ")[1]); // "Bearer ~token~" => "~token~"
    console.log(`userId:`, userId);
    const contactId = req.params?.contactId;

    if (contactId) {
      let searchedContact;
      try {
        searchedContact = await findContactById(contactId);
        if (searchedContact.owner.toString() !== userId) {
          throw new Error("Not autorized");
        }
        
      } catch (e) {
        searchedContact
          ? res.status(401).json({ msg: e.message })
          : res.status(404).json({ msg: "Not found" });
          return
      }
    }
    req.body ? (req.body.owner = userId) : (req.owner = userId);
    req.owner = userId;
  } catch (e) {
    res.status(401).json({ msg: e.message });
    return;
  }
  next();
};
