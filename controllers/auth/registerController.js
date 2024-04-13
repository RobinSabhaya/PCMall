const bcrypt = require("bcryptjs");
const nodeMailer = require("../../config/nodeMailer");
const mailTemplate = require("../../config/mailTemplate");
const registerModel = require("../../db/models/registerSchema");
const BASE_URL = process.env.BASE_URL;
const registerController = () => {
  return {
    getRegister(req, res) {
      return res.status(200).render("Register_Page");
    },
    async postRegister(req, res) {
      const { name, email, password, cpassword } = req.body;
      try {
        const registerData = await registerModel.exists({ email: email });

        /**
         * PCMall APP
         */

        if (req.xhr) {
          if (registerData) {
            return res.status(400).json({
              success: "false",
              message: "Email is already exist",
            });
          } else {
            if (cpassword === password) {
              const hashPassword = await bcrypt.hash(password, 10);
              const registerData = new registerModel({
                name: name,
                email: email,
                password: hashPassword,
              });
              await registerData.save();
              const data = {
                name: name,
                email: email,
              };
              const subject = `Congratulations, you have successfully registered as ${data.name} on ${BASE_URL}`;
              nodeMailer(email, subject, mailTemplate(data)).catch((err) => {
                return res.status(200).json({
                  success: "false",
                  message: "Something went wrong",
                });
              });
              return res.status(200).json({
                success: true,
                message: "User registered successfully",
              });
            } else {
              return res.json({
                success: false,
                message: "Password and confirm password doesn't match",
              });
            }
          }
        }

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
            const data = {
              name: name,
              email: email,
            };
            const subject = `Congratulations, you have successfully registered as ${data.name} on ${BASE_URL}`;
            nodeMailer(email, subject, mailTemplate(data)).catch((err) => {
              return res.status(302).redirect("/register");
            });
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
