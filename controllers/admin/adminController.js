const orderModel = require("../../db/models/orderSchema");
const registerModel = require("../../db/models/registerSchema");
const json2csv = require("json2csv").parse;

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
    async orderStatus(req, res) {
      const { orderId, status } = req.body;
      const statusData = await orderModel.findOne({ _id: orderId });
      const eventEmitter = req.app.get("eventEmitter");
      eventEmitter.emit("orderUpdated", { id: orderId, status: status });
      statusData.status = status;
      await statusData.save();
      return res.redirect("/admin/order");
    },

    async downloadCsv(req, res) {
      const userData = await registerModel.find();

      const csv = json2csv(JSON.parse(JSON.stringify(userData)));
      res.setHeader(
        "Content-disposition",
        `attachment; filename=${
          `${new Date().getDate()}-` +
          `${new Date().getMonth() + 1}-` +
          `${new Date().getFullYear()}-`
        }_users.csv`
      );
      res.set("Content-Type", "text/csv");
      res.status(200).send(csv);
    },
  };
};

module.exports = adminController;
