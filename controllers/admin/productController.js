const productModel = require("../../db/models/productSchema");
const productController = () => {
  return {
    async postProduct(req, res) {
      const productData = new productModel(req.body);
      await productData.save();
      return res.status(201).json({
        status: 201,
        msg: "Product created successfully",
      });
    },
    async singleProduct(req, res) {
      const { id } = req.params;
      const productData = await productModel.findOne({ _id: id });
      return res
        .status(200)
        .render("single_product", { productData: productData });
    },
    async singleProductPost(req, res) {
      // console.log(req.body);
    },
  };
};
module.exports = productController;
