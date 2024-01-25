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
  checkVerification,
  sendVerifyMailMiddlewar,
  verifyUser,
} = require("../../middlewares/userMiddlewares");
const { protect } = require("../../middlewares/contactMiddlewares");

const router = express.Router();

router.post("/register", checkSignupData, makeDataReady, addUserToDB, sendVerifyMailMiddlewar);

router.post("/login", checkLoginData, checkVerification, returnLoggedInUser);

router.post("/logout", protect, logOut);

router.get("/verify/:verificationToken", verifyUser)

router.post("/verify", sendVerifyMailMiddlewar)

router.get("/current", protect, getCurrentUser);

router.patch("/avatars", protect, uploadUserPhoto, normalizePhoto, saveUserPhoto, (req, res, next) => {
  res
    .status(200)
    .json({ msg: "Success", file: req.file.path.replace("public", "") });
});

module.exports = router;
