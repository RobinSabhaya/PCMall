const express = require("express");

const route = express.Router();

const adminController = require("../controllers/admin/adminController");
route.get("/admin/order", adminController().getAdmin);
route.post("/admin/order/status", adminController().orderStatus);
module.exports = route;
