const express = require("express");
const passport = require("passport");
const route = express.Router();

route.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
route.get(
  "/redirect",
  passport.authenticate("google", {
    successRedirect: "/",
  })
);

module.exports = route;
