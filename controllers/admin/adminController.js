const orderModel = require("../../db/models/orderSchema");
const adminController = () => {
  return {
    async getAdmin(req, res) {
      orderModel
        .find({ status: { $ne: "complete" } })
        .sort({ createdAt: -1 })
        .populate("customerId", "-password")
        .exec((err, order) => {
          if (req.xhr) {
            return res.status(200).json(order);
          } else {
            return res.status(200).render("admin");
          }
        });
    },
    async orderStatus(req,res){
      const {orderId,status} = req.body;
      const statusData = await orderModel.findOne({_id : orderId});
      const eventEmitter = req.app.get('eventEmitter');
      eventEmitter.emit("orderUpdated",{id : orderId,status : status});
      statusData.status = status;
      await statusData.save();
      return res.redirect('/admin/order');
    }
  };
};

module.exports = adminController;
