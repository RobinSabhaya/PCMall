const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerId  : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "register"
    },
    items : {
        type : Object,
    },
    phone : {
        type : Number
    },
    address : {
        type : String
    },
    paymentType : {
        type : String,
    },
    paymentStatus : {
        type : Boolean,
    },
    status : {
        type : String,
    }
    
},{timestamps : true});

const orderModel = mongoose.model("order",orderSchema);

module.exports = orderModel;