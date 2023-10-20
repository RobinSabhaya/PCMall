const moment = require("moment");
const orderModel = require("./../../db/models/orderSchema");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const orderController = () => {
  return {
    async getOrder(req, res) {
      const orderData = await orderModel.find().sort({
        createdAt: -1,
      });
      return res.status(200).render("order", { orderData, moment });
    },
    async singleOrder(req, res) {
      const { id } = req.params;
      const orderData = await orderModel.findOne({ _id: id });
      return res.status(200).render("singleOrder", { orderData });
    },
    async postOrder(req, res) {
      const { phone, address, token, paymentType } = req.body;
      const orderData = new orderModel({
        customerId: req?.session?.user?._id,
        items: req.session.cart.items,
        cart: req.session.cart,
        phone,
        address,
        paymentType,
        paymentStatus: false,
        status: "order_placed",
      });
      if (paymentType === "card") {
        try {
          stripe.customers
            .create({
              email: "robinjsabhaya13@gmail.com",
              source: token,
            })
            .then(async (customer) => {
              stripe.paymentIntents.create({
                amount: req.session.cart.totalPrice * 100,
                customer: customer._id,
                currency: "INR",
                description: `orderId : ${req.session.cart.items}`,
              });
              orderData.paymentStatus = true;
              await orderData.save();
              delete req.session.cart;
              req.flash("payment", "payment success");
              return res.status(302).redirect("/customer/order");
            });
        } catch (error) {
          console.log(error.message);
        }
      }
    },
  };
};

module.exports = orderController;
