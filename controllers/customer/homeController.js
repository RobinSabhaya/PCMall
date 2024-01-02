const productModel = require("../../db/models/productSchema");
const BASE_URL = process.env.BASE_URL;
const homeController = () => {
  return {
    async getHome(req, res) {
      const productData = await productModel.find();
      return res.status(200).render("home", { productData, BASE_URL });
    },
  };
};
module.exports = homeController;
