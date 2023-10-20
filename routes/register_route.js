const express = require("express");

const route = express.Router();
const registerController = require("../controllers/customer/registerController");
const { validation, validator } = require("../middlewares/validation");

route.get("/register", registerController().getRegister);
route.post(
  "/register",
  [validator(), validation],
  registerController().postRegister
);

module.exports = route;
