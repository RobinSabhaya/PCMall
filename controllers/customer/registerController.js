const bcrypt = require("bcryptjs");
const registerModel = require("../../db/models/registerSchema");
const registerController = () => {
  return {
    getRegister(req, res) {
      return res.status(200).render("Register_Page");
    },
    async postRegister(req, res) {
      const { name, email, password, cpassword } = req.body;
      try {
        const registerData = await registerModel.exists({ email: email });
        if (registerData) {
          req.flash("credentials", "Email is already exist!!");
          return res.redirect("/register");
        } else {
          if (cpassword === password) {
            const hashPassword = await bcrypt.hash(password, 10);
            const registerData = new registerModel({
              name: name,
              email: email,
              password: hashPassword,
            });
            await registerData.save();
            return res.status(302).redirect("/login");
          } else {
            req.flash("credentials", "Invalid password");
            return res.redirect("/register");
          }
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

module.exports = registerController;
