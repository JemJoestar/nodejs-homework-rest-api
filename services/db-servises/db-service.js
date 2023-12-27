const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Success");
  } catch (e) {
    console.log("Can`t connect to db");
    console.log(e.message);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
};
