const express = require("express");

const route = express.Router();
const orderController = require("../controllers/customer/orderController");
const invoiceController = require("../controllers/customer/invoiceController");
const wishlistController = require("../controllers/customer/wishlistController");
const userController = require("../controllers/admin/userController");
const { auth, isCustomer } = require("../middlewares/auth");
const upload = require("../middlewares/multer");
route.get("/customer/order", [auth, isCustomer], orderController().getOrder);
route.post("/customer/order", [auth, isCustomer], orderController().postOrder);
route.get(
  "/customer/order/:id",
  [auth, isCustomer],
  orderController().singleOrder
);
route.get(
  "/customer/invoice/:id",
  [auth, isCustomer],
  invoiceController().getInvoice
);
route.post(
  "/customer/wishlist",
  [auth, isCustomer],
  wishlistController().postWishlist
);
route.get(
  "/customer/wishlist/:id",
  [auth, isCustomer],
  wishlistController().getWishlist
);
route.get("/user/:id", [auth], userController().getUpdateUser);
route.post(
  "/user/:id",
  [auth, upload.single("profile")],
  userController().updateUser
);
// route.delete(
//   "/customer/wishlist/:id",
//   auth,
//   wishlistController().deleteWishlist
// );

module.exports = route;
