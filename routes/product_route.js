const express = require("express");

const route = express.Router();
const productController = require("../controllers/admin/productController");
const { auth, isAdmin, isCustomer } = require("../middlewares//auth");
const upload = require("../middlewares/multer");
route.post(
  "/product",
  [[auth, isAdmin], upload.array("file", 5)],
  productController().postProduct
);
route.get("/product", productController().getProduct);
route.get("/addproduct", [auth, isAdmin], productController().addProduct);
route.get(
  "/product/:id",
  [auth, isAdmin],
  productController().updateGetProduct
);
route.post(
  "/product/:id",
  [[auth, isAdmin], upload.single("file")],
  productController().updateProduct
);
route.get(
  "/singleproduct/:id",
  [auth, isCustomer],
  productController().singleProduct
);
route.delete(
  "/product/:id",
  [auth, isAdmin],
  productController().deleteProduct
);

module.exports = route;
