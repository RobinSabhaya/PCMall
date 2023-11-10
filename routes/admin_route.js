const express = require("express");

const route = express.Router();

const { auth, isAdmin, isCustomer } = require("../middlewares/auth");
const adminController = require("../controllers/admin/adminController");
const dashboardController = require("../controllers/admin/dashboardController");
const userController = require("../controllers/admin/userController");
route.get("/admin/order", [auth, isAdmin], adminController().getAdmin);
route.post(
  "/admin/order/status",
  [auth, isAdmin],
  adminController().orderStatus
);
route.get("/user", [auth, isAdmin], userController().getUser);
route.delete("/user/:id", [auth, isAdmin], userController().deleteUser);
route.get(
  "/admin/dashboard",
  [auth, isAdmin],
  dashboardController().getDashboard
);
module.exports = route;
