const express = require("express");

const route = express.Router();
const loginController = require("../controllers/auth/loginController");
const {
  loginValidation,
  loginValidator,
} = require("../middlewares/validation");

route.get("/login", loginController().getLogin);
route.post(
  "/login",
  [loginValidator(), loginValidation],
  loginController().postLogin
);
route.post("/logout", loginController().postLogout);

module.exports = route;
