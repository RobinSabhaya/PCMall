const express = require("express");

const route = express.Router();
const productController = require("../controllers/admin/productController");

route.post("/product", productController().postProduct);
route.post("/singleproduct/:id", productController().singleProductPost);
route.get("/singleproduct/:id", productController().singleProduct);

module.exports = route;
