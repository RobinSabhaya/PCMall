const registerModel = require('../../db/models/registerSchema');
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const loginController = () => {
  return {
    getLogin(req, res) {
      return res.status(200).render("Login_Page");
    },
    async postLogin(req, res) {
        const { Lemail, Lpassword } = req.body;
        const data = await registerModel.findOne({ email: Lemail });
        const hash = await bcrypt.compare(Lpassword, data.password);
        if (Lemail === data.email && hash === true) {
          const token = await jwt.sign({_id : data._id,user : data.name},SECRET_KEY);
          res.cookie('login',token);
          data.token = token;
          await data.save();
          req.session.user = {_id : data._id,user : data.name};
          return res.status(301).redirect('/');
        }
    },
  }
};

module.exports = loginController;
