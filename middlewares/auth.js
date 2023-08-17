const registerModel = require('./../db/models/registerSchema');
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY;
const auth = async (req, res, next) => {
  // const {_id,user} = req.user;
  // const jwtData = await jwt.verify({_id,user},SECRET_KEY);
  // console.log(jwtData)
  next()
};

module.exports = auth;
