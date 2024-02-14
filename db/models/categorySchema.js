const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    subCategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    tags: [],
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
