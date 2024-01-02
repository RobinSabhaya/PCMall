const mongoose = require("mongoose");
const registerSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "customer",
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    profile: {
      type: String,
    },
  },
  { timestamps: true }
);
const registerModel = mongoose.model("register", registerSchema);
module.exports = registerModel;
