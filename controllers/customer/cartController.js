const orderModel = require('./../../db/models/orderSchema')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY;
const cartController = () =>{
    return {
        updateCart(req,res){ 
            // const cart ={
            //     items : {
            //         pizzaObject,
            //         qty
            //     }
            //     totalQty,
            //     totalPrice
            // }
            if(!req.session.cart){
                req.session.cart = {
                    items : {},
                    totalQty : 0,
                    totalPrice : 0,
                };
            }
            let cart = req.session.cart;
       if(!cart.items[req.body._id]){
        cart.items[req.body._id] = {
                item : req.body,
                qty : 1
        }
        cart.totalQty = cart.totalQty + 1; 
        cart.totalPrice = cart.totalPrice + req.body.price; 
        }
        else{
            cart.items[req.body._id].qty =  cart.items[req.body._id].qty + 1;
            cart.totalQty = cart.totalQty + 1; 
            cart.totalPrice = cart.totalPrice + req.body.price;  
        }

        return res.json({msg : "successfully added into the cart",totalQty : cart.totalQty,totalPrice : cart.totalPrice})
        },
        getCart(req,res){
               if(req.session.cart){
                const cartData = Object.values(req.session.cart.items);
                return res.status(200).render('cart',{cartData});
               }
                return res.status(200).render('cart',{cartData : ""});
        },
        async addItem(req,res){
            const {add,remove} = req.body;
                const itemsList = Object.values(req.session.cart.items);
                itemsList.forEach((item)=>{
                    if(item.qty > 0){
                        item.qty = (item.qty + (add ? +add : -remove));
                        req.session.cart.totalPrice = item.qty * item.item.price;
                        req.session.cart.totalQty = req.session.cart.totalQty + (add ? +add : -remove);
                        req.session.save();
                    }
                });

        }
    }
}

module.exports = cartController;