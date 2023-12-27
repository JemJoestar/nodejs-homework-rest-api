const express = require("express");

const { checkSignupData, makeDataReady, addUserToDB, checkLoginData, returnLoggedInUser, logOut, getCurrentUser } = require("../../middlewares/userMiddlewares");
const { protect } = require("../../middlewares/contactMiddlewares");



const router = express.Router();

router.post("/register", checkSignupData, makeDataReady, addUserToDB);

router.post("/login", checkLoginData, returnLoggedInUser)

router.post("/logout", protect, logOut)

router.get("/current", protect, getCurrentUser)

module.exports = router;
