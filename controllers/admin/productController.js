const path = require("path");
const BASE_URL = process.env.BASE_URL;
const productModel = require("../../db/models/productSchema");
const categoryModel = require("../../db/models/categorySchema");
const fs = require("fs");
const productController = () => {
  return {
    async postProduct(req, res) {
      try {
        if (req.files) {
          const { name, brand, price, discount, colors, categoryId } = req.body;
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
            categoryId,
          });
          await productData.save();
          return res.redirect("/product");
        }
      } catch (err) {
        return res.status(400).json({
          status: "error",
          message: err.message,
        });
      }
    },
    async singleProduct(req, res) {
      const { id } = req.params;
      const productData = await productModel.findOne({ _id: id });
      if (req.xhr) {
        return res.status(200).json({
          status: 200,
          productData,
        });
      } else {
        return res
          .status(200)
          .render("single_product", { productData, BASE_URL });
      }
    },
    async getProduct(req, res) {
      try {
        let productData = await productModel
          .find()
          .select("-createdAt -updatedAt -__v");
        const { category } = req.query;
        if (req.query) {
          productData = await productModel
            .find({ categoryId: category })
            .select("-createdAt -updatedAt -__v");
          return res.json({
            status: "success",
            productData,
            url: BASE_URL,
          });
        } else {
          return res.render("allproduct", { productData, BASE_URL });
        }
      } catch (err) {
        return res.json({
          status: 400,
          message: err.message,
        });
      }
    },
    async addProduct(req, res) {
      const categoryData = await categoryModel.find();
      return res.render("product", { categoryData });
    },
    async updateGetProduct(req, res) {
      try {
        const { id } = req.params;
        const productData = await productModel.findOne({ _id: id });
        const categoryData = await categoryModel.find();
        return res.render("editproduct", {
          productData,
          BASE_URL,
          categoryData,
        });
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
        console.log(req.body);
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
