const express = require("express");

const route = express.Router();
const { auth, isCustomer } = require("../middlewares/auth");
const cartController = require("../controllers/customer/cartController");
route.post("/updatecart", [auth, isCustomer], cartController().updateCart);
route.get("/cart", [auth, isCustomer], cartController().getCart);
route.post("/additem", [auth, isCustomer], cartController().addItem);

module.exports = route;
