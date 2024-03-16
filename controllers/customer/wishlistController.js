const wishlistModel = require("../../db/models/wishlistSchema");
const BASE_URL = process.env.BASE_URL;
const wishlistController = () => {
  return {
    async postWishlist(req, res) {
      const { productId } = req.body;
      try {
        let message;
        if (req.session.user._id) {
          const wishlistExists = await wishlistModel.findOne({ productId });
          if (wishlistExists) {
            await wishlistModel.findOneAndDelete({
              productId: productId,
              customerId: req.session.user._id,
            });
            message = "Wishlist removed successfully!!";
          } else {
            const wishlistData = new wishlistModel({
              customerId: req?.session?.user?._id,
              productId,
            });
            await wishlistData.save();
            message = "Wishlist added successfully!!";
          }
          return res.status(200).json({
            status: "success",
            message,
          });
        } else {
          return res.status(401).json({
            status: "error",
            message: "Login Required",
          });
        }
      } catch (err) {
        return res.status(400).json({
          status: "error",
          message: "Login failed",
        });
      }
    },
    async getWishlist(req, res) {
      const { id } = req.params;
      const wishlistData = await wishlistModel
        .find({ customerId: id })
        .populate("productId")
        .select("-createdAt -updatedAt -__v");
      return res.status(200).render("wishlist", {
        wishlistData,
        BASE_URL,
      });
    },
    // async deleteWishlist(req, res) {
    //   const { id } = req.params;
    //   await wishlistModel.deleteOne({ productId: id });
    //   return res.json({
    //     status: "success",
    //     message: "Wishlist deleted successfully",
    //   });
    // },
  };
};

module.exports = wishlistController;
