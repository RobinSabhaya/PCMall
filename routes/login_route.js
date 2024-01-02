const express = require("express");

const route = express.Router();
const loginController = require("../controllers/auth/loginController");

route.get("/login", loginController().getLogin);
route.post("/login", loginController().postLogin);
route.post("/logout", loginController().postLogout);

module.exports = route;
