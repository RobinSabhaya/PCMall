const express = require("express");

const route = express.Router();
const policyController = require("../controllers/customer/policyController");

route.get("/termcondition", policyController().term);
route.get("/returnpolicy", policyController().return);
route.get("/supportpolicy", policyController().support);
route.get("/privacypolicy", policyController().privacy);

module.exports = route;
