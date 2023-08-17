const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    link : {
        type : String,
        required : true
    },
    img : {
        type : String,
        required : true
    }
},{timestamps : true});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;