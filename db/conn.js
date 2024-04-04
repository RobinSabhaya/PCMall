const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;
const conn = mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = conn;
