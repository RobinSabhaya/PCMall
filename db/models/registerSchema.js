const mongoose = require('mongoose');
const registerSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    token:String
},{timestamps : true});
const registerModel = mongoose.model("register", registerSchema);
module.exports = registerModel;