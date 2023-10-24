const express = require("express");

const route = express.Router();
const auth = require("../middlewares/auth");
const loginController = require("../controllers/customer/loginController");

route.get("/login", loginController().getLogin);
route.post("/login", [auth], loginController().postLogin);
route.post("/logout", loginController().postLogout);

module.exports = route;
