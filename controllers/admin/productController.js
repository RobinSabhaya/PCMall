const path = require("path");
const BASE_URL = process.env.BASE_URL;
const productModel = require("../../db/models/productSchema");
const categoryModel = require("../../db/models/categorySchema");
const ratingModel = require("../../db/models/ratingSchema");
const fs = require("fs");
const mongoose = require("mongoose");
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
      const ratingData = await ratingModel.aggregate([
        {
          $match: {
            product: productData._id,
          },
        },
        {
          $lookup: {
            from: "registers",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$product",
            avg_rating: {
              $avg: "$rating",
            },
            user: {
              $addToSet: "$user",
            },
            rating_count: {
              $sum: 1,
            },
            one_star: {
              $sum: {
                $cond: {
                  if: {
                    $eq: ["$rating", 1],
                  },
                  then: {
                    $sum: 1,
                  },
                  else: 0,
                },
              },
            },
            two_star: {
              $sum: {
                $cond: {
                  if: {
                    $eq: ["$rating", 2],
                  },
                  then: {
                    $sum: 1,
                  },
                  else: 0,
                },
              },
            },
            three_star: {
              $sum: {
                $cond: {
                  if: {
                    $eq: ["$rating", 3],
                  },
                  then: {
                    $sum: 1,
                  },
                  else: 0,
                },
              },
            },
            four_star: {
              $sum: {
                $cond: {
                  if: {
                    $eq: ["$rating", 4],
                  },
                  then: {
                    $sum: 1,
                  },
                  else: 0,
                },
              },
            },
            five_star: {
              $sum: {
                $cond: {
                  if: {
                    $eq: ["$rating", 5],
                  },
                  then: {
                    $sum: 1,
                  },
                  else: 0,
                },
              },
            },
          },
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            user: 1,
            avg_rating: 1,
            rating_count: 1,
            one_star: 1,
            two_star: 1,
            three_star: 1,
            four_star: 1,
            five_star: 1,
          },
        },
      ]);
      if (req.xhr) {
        return res.status(200).json({
          status: 200,
          productData,
          ratingData: ratingData[0],
        });
      } else {
        return res.status(200).render("single_product", {
          productData,
          ratingData: ratingData[0],
          BASE_URL,
        });
      }
    },
    async getProduct(req, res) {
      try {
        const { category, page, limit } = req.query;
        const filter = {};
        const pagination = {
          page: page || 1,
          limit: limit || 10,
        };
        let productData;
        productData = await productModel
          .find()
          .select("-createdAt -updatedAt -__v");
        if (category) {
          filter.categoryId = category;
          productData = await productModel
            .find(filter)
            .select("-createdAt -updatedAt -__v");
          return res.json({
            status: "success",
            productData,
            totalResult: productData.length,
            url: BASE_URL,
          });
        }
        if (req.query) {
          productData = await productModel
            .find()
            .select("-createdAt -updatedAt -__v")
            .skip((pagination.page - 1) * pagination.limit)
            .limit(pagination.limit);
          return res.json({
            status: "success",
            productData,
            totalResult: productData.length,
            page: pagination.page,
            limit: pagination.limit,
            total_pages: Math.floor(productData.length / pagination.limit),
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
