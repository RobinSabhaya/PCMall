const dayjs = require("dayjs");
const orderModel = require("../../db/models/orderSchema");
const productModel = require("../../db/models/productSchema");
const registerModel = require("../../db/models/registerSchema");
const dashboardController = () => {
  return {
    async getDashboard(req, res) {
      const totalAmount = [0];
      const orderData = await orderModel.find();
      const productData = await productModel.find();
      orderData.forEach((order) => {
        totalAmount.push(order?.cart?.totalPrice);
      });
      const totalPrice = totalAmount.reduce((acc, ele) => {
        return acc + ele;
      });
      const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      const orderPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const countMonth = [];
      orderData.forEach((order) => {
        months.forEach((month) => {
          if (month == dayjs(order.createdAt).format("M")) {
            countMonth.push(month);
            orderPerMonth[month - 1] = countMonth.length;
          }
        });
      });
      const userData = await registerModel.find();
      return res.render("dashboard", {
        orderData,
        totalPrice,
        productData,
        orderPerMonth,
        userData,
      });
    },
  };
};

module.exports = dashboardController;
