const productModel = require("../../db/models/productSchema");
const BASE_URL = process.env.BASE_URL;
const searchProductController = () => {
  return {
    async searchProduct(req, res) {
      try {
        const { q } = req.query;
        // Design regExp for search products
        const regExp = "^q".replace("q", q);
        const productData = await productModel.findOne({
          name: { $regex: regExp, $options: "i" },
        });
        return res.json({ productData: productData });
      } catch (err) {
        return res.json({ msg: err });
      }
    },
    async filterProduct(req, res) {
      try {
        const { id } = req.params;
        const productData = await productModel.findOne({ _id: id });
        return res.render("searchProduct", { productData, BASE_URL });
      } catch (err) {
        return res.redirect("/");
      }
    },
  };
};

module.exports = searchProductController;
