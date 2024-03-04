const { check, validationResult } = require("express-validator");

const validator = () => {
  return [
    check("name", "name is required").notEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "password is required").notEmpty(),
    check("cpassword", "password is required").notEmpty(),
  ];
};

const validation = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length > 0) {
    req.flash("error", error);
    return res.redirect("/register");
  }
  next();
};

const loginValidator = () => {
  return [
    check("Lemail", "email is required").notEmpty(),
    check("Lpassword", "password is required").notEmpty(),
  ];
};

const loginValidation = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length > 0) {
    req.flash("error", error);
    return res.redirect("/login");
  }
  next();
};

module.exports = { validator, validation, loginValidator, loginValidation };
