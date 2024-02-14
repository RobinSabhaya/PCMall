const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    subCategoryName: {
      type: String,
      required: true,
    },
    tags: [],
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const subCategoryModel = mongoose.model("subcategory", subCategorySchema);

module.exports = subCategoryModel;
