const express = require("express");

const route = express.Router();
const auth = require("../middlewares/auth");
const loginController = require("../controllers/customer/loginController");
const logoutController = require("../controllers/customer/logoutController");

route.get("/login", loginController().getLogin);
route.post("/login", [auth], loginController().postLogin);
route.post("/logout", logoutController().postLogout);

module.exports = route;
