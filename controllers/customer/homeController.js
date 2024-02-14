const productModel = require("../../db/models/productSchema");
const categoryModel = require("../../db/models/categorySchema");
const BASE_URL = process.env.BASE_URL;
const homeController = () => {
  return {
    async getHome(req, res) {
      const productData = await productModel
        .find()
        .select("-createdAt -updatedAt -__v");
      const categoryData = await categoryModel.find();
      return res
        .status(200)
        .render("home", { productData, BASE_URL, categoryData });
    },
  };
};
module.exports = homeController;
