const express = require("express");

const {
  checkSignupData,
  makeDataReady,
  addUserToDB,
  checkLoginData,
  returnLoggedInUser,
  logOut,
  getCurrentUser,
  uploadUserPhoto,
  normalizePhoto,
  saveUserPhoto,
} = require("../../middlewares/userMiddlewares");
const { protect } = require("../../middlewares/contactMiddlewares");

const router = express.Router();

router.post("/register", checkSignupData, makeDataReady, addUserToDB);

router.post("/login", checkLoginData, returnLoggedInUser);

router.post("/logout", protect, logOut);

router.get("/current", protect, getCurrentUser);

router.patch("/avatars", protect, uploadUserPhoto, normalizePhoto, saveUserPhoto, (req, res, next) => {
  res
    .status(200)
    .json({ msg: "Success", file: req.file.path.replace("public", "") });
});

module.exports = router;
