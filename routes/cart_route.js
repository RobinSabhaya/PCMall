const express = require("express");

const route = express.Router();

const cartController = require("../controllers/customer/cartController");

route.post("/updatecart", cartController().updateCart);
route.get("/cart", cartController().getCart);
route.post("/additem", cartController().addItem);

module.exports = route;
