const jwt = require("jsonwebtoken");

exports.signToken = (id) =>
  jwt.sign({ id }, process.env.SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });

exports.checkToken = async (token) => {
  if (!token) throw new Error("Not authorized");

  try {
    const {id} = await jwt.verify(token, process.env.SECRET)
    
    return id
  } catch (e) {
    throw new Error("Not authorized")
  }
};
