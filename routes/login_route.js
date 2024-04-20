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
route.get("/reset-password", loginController().getForgetPassword);
route.post("/reset-password", loginController().postForgetPassword);
route.get("/change-password", loginController().getChangePassword);
route.post("/change-password", loginController().postChangePassword);
route.post("/social-login", loginController().socialLogin);

module.exports = route;
