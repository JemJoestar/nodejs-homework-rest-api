const bcrypt = require("bcrypt");
const {
  checkUserEmail,
  createUser,
  findUserByFilter,
  updateAvatar,
} = require("../services/db-servises/user-db-servise");
const { userValidators } = require("../validators");
const jwtServise = require("../services/jwt-servise");
const { subscriptionsEnum } = require("../constants/subscriptions-enum");
const { genAvatar } = require("../services/avatar-servise");
const multer = require("multer");
const Jimp = require("jimp");
const uuid = require("uuid").v4;

exports.checkSignupData = async (req, res, next) => {
  const userData = req.body;

  const validation = userValidators.createSchema.validate(userData);

  if (validation.error) {
    res.status(400).json({ msg: validation.error });
    return;
  }
  try {
    await checkUserEmail(userData.email);
  } catch (e) {
    res.status(409).json({
      message: "Email in use",
    });
    return;
  }
  next();
};

exports.makeDataReady = async (req, res, next) => {
  const newUser = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(newUser.password, salt);

  newUser.password = hash;
  newUser.avatar = await genAvatar(newUser.email);
  if (!newUser.subscription) {
    newUser.subscription = subscriptionsEnum.STARTER;
  }

  req.body = newUser;
  next();
};

exports.addUserToDB = async (req, res, next) => {
  const newUser = await createUser(req.body);

  newUser.token = await jwtServise.signToken(newUser._id);

  await newUser.save();

  newUser.password = undefined;

  res.status(201).json(newUser);
};

// LOGIN

exports.checkLoginData = async (req, res, next) => {
  const validation = userValidators.loginSchema.validate(req.body);
  if (validation.error) {
    res.status(400).json({ msg: validation.error });
    return;
  }

  try {
    const userFromDb = await findUserByFilter({ email: req.body.email });
    console.log(`userFromDb:`, userFromDb);

    const password = req.body.password;

    console.log(`password:`, password);

    const result = await new Promise((resolve, reject) => {
      bcrypt.compare(password, userFromDb.password, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (result) {
      req.token = jwtServise.signToken(userFromDb._id);
      userFromDb.token = req.token;
      await userFromDb.save();
      req.user = userFromDb;
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(401).json({ message: "Email or password is wrong" });
  }
};

exports.returnLoggedInUser = async (req, res, next) => {
  const token = req.token;
  req.user.token = undefined;
  res.status(200).json({ user: req.user, token });
};

// LOGOUT
exports.logOut = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const id = await jwtServise.checkToken(token);

  const userToLogOut = await findUserByFilter({ _id: id });
  userToLogOut.token = null;
  await userToLogOut.save();

  res.status(204).json();
};

// CURRENT

exports.getCurrentUser = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const id = await jwtServise.checkToken(token);
  const currentUser = await findUserByFilter({ _id: id });

  currentUser.password = undefined;

  res.status(200).json(currentUser);
};

const multerStorage = multer.diskStorage({
  destination: (req, file, cbk) => {
    console.log(`req:`, file);
    cbk(null, "tmp/avatars");
    console.log(`req.owner:`, req.owner);
  },
  filename: (req, file, cbk) => {
    const extension = file.mimetype.split("/")[1];
    cbk(null, `${req.owner}-${uuid()}.${extension}`);
  },
});

const multerFilter = (req, file, cbk) => {
  if (file.mimetype.startsWith("image/")) {
    req.file = file;
    cbk(null, true);
  } else {
    cbk(new Error("invalid image"), false);
  }
};

exports.uploadUserPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
}).single("avatar");

exports.normalizePhoto = async (req, res, next) => {
  const image = await Jimp.read(req.file.path);
  await image.resize(250, 250)

  await image.write(`./public/avatars/${req.file.filename}`)
  req.file.path = `/avatars/${req.file.filename}`;
  next();
};

exports.saveUserPhoto = async (req, res,next) => {
  const avatarUrl = req.file.path
  const userId = req.owner
  await updateAvatar(avatarUrl, userId)
  next()
}