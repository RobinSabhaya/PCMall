const registerModel = require("../../db/models/registerSchema");
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodeMailer = require("../../config/nodeMailer");
const BASE_URL = process.env.BASE_URL;
const forget_password_mail = require("../../config/forget_password_mail");
const { decryptText, encryptText } = require("../../helpers/function.helper");
const CIPHER_SECRET = process.env.CIPHER_SECRET;

const loginController = () => {
  return {
    getLogin(req, res) {
      return res.status(200).render("Login_Page");
    },
    async postLogin(req, res) {
      const { Lemail, Lpassword } = req.body;
      const loginData = await registerModel.findOne({ email: Lemail });

      /**
       * PCMall APP
       */
      if (req.xhr) {
        if (loginData) {
          const hash = await bcrypt.compare(Lpassword, loginData.password);
          if (Lemail === loginData.email && hash) {
            req.session.user = {
              _id: loginData._id,
              name: loginData.name,
              role: loginData.role,
            };
            const accessToken = jwt.sign(req.session.user, SECRET_KEY);
            // req.session.user.accessToken = accessToken;
            return res.status(200).json({
              success: true,
              message: "Login successfully",
              accessToken: accessToken,
            });
          } else {
            return res.status(400).json({
              success: false,
              message: "Invalid email and password",
            });
          }
        } else {
          return res.status(400).json({
            success: false,
            message: "Invalid email and password",
          });
        }
      }

      if (loginData) {
        const hash = await bcrypt.compare(Lpassword, loginData.password);
        if (Lemail === loginData.email && hash) {
          req.session.user = {
            _id: loginData._id,
            name: loginData.name,
            role: loginData.role,
          };
          const accessToken = jwt.sign(req.session.user, SECRET_KEY);
          req.session.user.accessToken = accessToken;
          return res.status(302).redirect("/");
        } else {
          req.flash("credentials", "Invalid email and password");
          return res.redirect("/login");
        }
      } else {
        req.flash("credentials", "Invalid email and password");
        return res.redirect("/login");
      }
    },
    async postLogout(req, res) {
      try {
        if (req.user) {
          delete req.session.passport;
          return res.redirect("/login");
        }
        if (req.session.user) {
          delete req.session.user;
          return res.redirect("/login");
        } else {
          return res.redirect("/login");
        }
      } catch (err) {
        return res.json({
          status: 400,
          message: err,
        });
      }
    },
    async getForgetPassword(req, res) {
      return res.status(200).render("forget_password");
    },
    async postForgetPassword(req, res) {
      const { email } = req.body;
      try {
        const userExists = await registerModel.findOne({ email });

        /**
         * PCMall APP
         */
        if (req.xhr) {
          if (!userExists) {
            return res.status(404).json({
              success: false,
              message: "Email not found",
            });
          }
          const encrypted = encryptText(userExists.email, CIPHER_SECRET);
          /** Send Email for verification */
          const reset_link = `${BASE_URL}/change-password?email=${encrypted}`;
          const mailData = {
            name: userExists.name,
            email: userExists.email,
            reset_link,
          };
          const subject = `You received password reset instructions from ${BASE_URL}`;
          nodeMailer(
            userExists.email,
            subject,
            forget_password_mail(mailData)
          ).catch((err) => {
            return res.status(500).json({
              success: true,
              message: "Something went wrong",
            });
          });
          return res.status(200).json({
            success: true,
            message: "Email send successfully",
          });
        }

        if (!userExists) {
          return res.redirect("/login");
        }
        const encrypted = encryptText(userExists.email, CIPHER_SECRET);
        /** Send Email for verification */
        const reset_link = `${BASE_URL}/change-password?email=${encrypted}`;
        const mailData = {
          name: userExists.name,
          email: userExists.email,
          reset_link,
        };
        const subject = `You received password reset instructions from ${BASE_URL}`;
        nodeMailer(
          userExists.email,
          subject,
          forget_password_mail(mailData)
        ).catch((err) => {
          return res.redirect("/login");
        });
        req.flash("success", "Email send successfully!!");
        return res.status(302).redirect("/reset-password");
      } catch (err) {
        return res.status(400).json({
          success: true,
          message: err.message,
        });
      }
    },

    async getChangePassword(req, res) {
      return res.render("change_password");
    },
    async postChangePassword(req, res) {
      const { email } = req.query;
      const { password, cpassword } = req.body;
      try {
        const decryptEmail = decryptText(email, CIPHER_SECRET);
        const userExists = await registerModel.findOne({ email: decryptEmail });
        if (!userExists) {
          return res.status(302).redirect("/login");
        }
        if (password === cpassword) {
          const hashPassword = await bcrypt.hash(password, 10);
          await registerModel.findByIdAndUpdate(
            { _id: userExists._id },
            { password: hashPassword },
            {
              new: true,
            }
          );
        } else {
          return res.status(400).json({
            status: 400,
            message: "Invalid password",
          });
        }
        return res.status(302).redirect("/login");
      } catch (err) {
        return res.status(400).json({
          status: 400,
          message: err.message,
        });
      }
    },
    async socialLogin(req, res) {
      const { email, name } = req.body;
      const userExists = await registerModel.findOne({ email: email });
      if (!userExists && !userExists?.password) {
        const userData = new registerModel({
          email,
          name,
        });
        await userData.save();
        let user = {
          _id: userData._id,
          name: userData.name,
          role: "customer",
        };
        const accessToken = jwt.sign(user, SECRET_KEY);
        req.session.user.accessToken = accessToken;
        return res.status(200).json({
          success: true,
          message: "Social login successful",
          accessToken: accessToken,
        });
      } else if (userExists && userExists.password) {
        return res.status(400).json({
          success: false,
          message: "Signup with email and password",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
    },
  };
};

module.exports = loginController;
