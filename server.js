const app = require("./app");
const { connectDB } = require("./services/db-service");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

connectDB()