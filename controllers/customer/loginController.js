const registerModel = require("../../db/models/registerSchema");
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const loginController = () => {
  return {
    getLogin(req, res) {
      return res.status(200).render("Login_Page");
    },
    async postLogin(req, res) {
      const { Lemail, Lpassword } = req.body;
      const loginData = await registerModel.findOne({ email: Lemail });
      if (loginData) {
        const hash = await bcrypt.compare(Lpassword, loginData.password);
        if (Lemail === loginData.email && hash === true) {
          req.session.user = { _id: loginData._id, user: loginData.name };
          return res.status(301).redirect("/");
        } else {
          req.flash("error", "Invalid email and password");
          return res.redirect("/login");
        }
      } else {
        req.flash("error", "Invalid email and password");
        return res.redirect("/login");
      }
    },
    async postLogout(req, res) {
      try {
        if (req.session.user) {
          delete req.session.user;
          return res.redirect("/login");
        } else {
          return res.redirect("/login");
        }
      } catch (err) {
        return res.json({
          status: 400,
          message: err.message,
        });
      }
    },
  };
};

module.exports = loginController;
