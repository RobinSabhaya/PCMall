const productModel = require("../../db/models/productSchema");
const categoryModel = require("../../db/models/categorySchema");
const ratingModel = require("../../db/models/ratingSchema");
const wishlistModel = require("../../db/models/wishlistSchema");
const BASE_URL = process.env.BASE_URL;
const homeController = () => {
  return {
    async getHome(req, res) {
      const productData = await productModel
        .find()
        .select("-createdAt -updatedAt -__v");
      const categoryData = await categoryModel.find();

      /** Rating Data  */
      const ratingData = await ratingModel.aggregate([
        {
          $group: {
            _id: "$product",
            avg_rating: {
              $avg: "$rating",
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

      const wishlistData = await wishlistModel
        .find({ customerId: req?.session?.user?._id })
        .populate("productId")
        .select("-createdAt -updatedAt -__v");
      console.log(wishlistData);
      return res.status(200).render("home", {
        productData,
        BASE_URL,
        categoryData,
        ratingData,
        wishlistData,
      });
    },
  };
};
module.exports = homeController;
