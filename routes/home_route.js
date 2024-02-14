const express = require("express");

const route = express.Router();
const homeController = require("../controllers/customer/homeController");
const searchProductController = require("../controllers/common/searchProductController");

route.get("/", homeController().getHome);
route.get("/search", searchProductController().searchProduct);
route.get("/search/:id", searchProductController().filterProduct);

module.exports = route;
