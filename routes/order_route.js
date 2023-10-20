const express = require("express");

const route = express.Router();
const orderController = require("../controllers/customer/orderController");
const invoiceController = require("../controllers/customer/invoiceController");
const wishlistController = require("../controllers/customer/wishlistController");

route.get("/customer/order", orderController().getOrder);
route.post("/customer/order", orderController().postOrder);
route.get("/customer/order/:id", orderController().singleOrder);
route.get("/customer/invoice/:id", invoiceController().getInvoice);
route.post("/customer/wishlist", wishlistController().postWishlist);
route.get("/customer/wishlist/:id", wishlistController().getWishlist);
route.delete("/customer/wishlist/:id", wishlistController().deleteWishlist);

module.exports = route;
