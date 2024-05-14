const ratingModel = require("../../db/models/ratingSchema");
const ratingController = () => {
  return {
    async getRating(req, res) {
      try {
        const ratingData = await ratingModel.find();
        return res.status(200).json({
          status: 200,
          data: ratingData,
        });
      } catch (err) {
        return res.status(400).json({
          status: 400,
          message: err.message,
        });
      }
    },
    async postRating(req, res) {
      try {
        const { id } = req.params;
        const { message, rating } = req.body;
        await ratingModel.create({
          product: id,
          user: req.user._id,
          rating,
          message,
        });
        if (req.xhr) {
          return res.status(201).json({
            status: 201,
            message: "Rating created successfully",
          });
        } else {
          return res.status(302).redirect(`/singleproduct/${id}`); //Redirect to same page
        }
      } catch (err) {
        return res.status(400).json({
          status: 400,
          message: err.message,
        });
      }
    },
  };
};

module.exports = ratingController;
