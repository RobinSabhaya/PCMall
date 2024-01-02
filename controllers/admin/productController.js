const path = require("path");
const BASE_URL = process.env.BASE_URL;
const productModel = require("../../db/models/productSchema");
const fs = require("fs");
const productController = () => {
  return {
    async postProduct(req, res) {
      if (req.files) {
        const { name, brand, price, discount, colors } = req.body;
        const imgs = [];
        req.files.forEach((img) => {
          imgs.push(img.filename);
        });
        const productData = new productModel({
          name,
          brand,
          price,
          discount,
          img: imgs,
          colors: [colors],
        });
        await productData.save();
        return res.redirect("/product");
      }
    },
    async singleProduct(req, res) {
      const { id } = req.params;
      const productData = await productModel.findOne({ _id: id });
      return res
        .status(200)
        .render("single_product", { productData, BASE_URL });
    },
    async getProduct(req, res) {
      const productData = await productModel.find();
      return res.render("allproduct", { productData, BASE_URL });
    },
    async addProduct(req, res) {
      return res.render("product");
    },
    async updateGetProduct(req, res) {
      try {
        const { id } = req.params;
        const productData = await productModel.findOne({ _id: id });
        return res.render("editproduct", { productData, BASE_URL });
      } catch (err) {
        return res.json({
          status: 400,
          message: err.message,
        });
      }
    },
    async updateProduct(req, res) {
      try {
        const { id } = req.params;
        if (req.file) {
          await productModel.updateOne({ _id: id }, req.body);
          const productData = await productModel.findOne({ _id: id });
          productData.img.push(req.file.filename);
          await productData.save();
          return res.redirect("/product");
        } else {
          await productModel.updateOne({ _id: id }, req.body);
          res.redirect("/product");
        }
      } catch (err) {
        return res.json({
          status: 400,
          message: err.message,
        });
      }
    },
    async deleteProduct(req, res) {
      try {
        const { id } = req.params;
        const productData = await productModel.findOne({ _id: id });
        productData.img.forEach((img) => {
          fs.unlink(
            path.format({ dir: "uploads", root: __dirname }) + `/${img}`,
            async (err) => {
              if (err) throw err;
              console.log("file deleted successfully");
            }
          );
        });
        await productModel.deleteOne({ _id: id });
        return res.json({
          status: 200,
          message: "Product deleted successfully",
        });
      } catch (err) {
        return res.json({
          status: 400,
          message: err.message,
        });
      }
    },
  };
};
module.exports = productController;
