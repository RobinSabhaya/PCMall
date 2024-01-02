const wishlistModel = require("../../db/models/wishlistSchema");
const BASE_URL = process.env.BASE_URL;
const wishlistController = () => {
  return {
    async postWishlist(req, res) {
      try {
        if (req.session.user._id) {
          const wishlistData = new wishlistModel({
            customerId: req?.session?.user?._id,
            wishlist: req.body.wishProduct,
          });
          await wishlistData.save();
          return res.status(200).json({
            status: "success",
            message: "Wishlist added successfully",
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
      const wishlistData = await wishlistModel.find({ customerId: id });
      return res.status(200).render("wishlist", {
        wishlistData,
        BASE_URL,
      });
    },
    async deleteWishlist(req, res) {
      await wishlistModel.deleteOne({ _id: req.params.id });
      return res.json({
        status: "success",
        message: "Wishlist deleted successfully",
      });
    },
  };
};

module.exports = wishlistController;
