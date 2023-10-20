const productModel = require("../../db/models/productSchema");
const homeController = () => {
  return {
    async getHome(req, res) {
      const productData = await productModel.find();
      return res.status(200).render("home", { productData });
    },
  };
};
module.exports = homeController;
