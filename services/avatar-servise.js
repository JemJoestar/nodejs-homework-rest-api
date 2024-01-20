const gravatar = require("gravatar");
const bcrypt = require("bcrypt");

const options = {
    d: "identicon"
}
exports.genAvatar = async (email) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(email, salt);

  return gravatar.url(hash, options);
};
