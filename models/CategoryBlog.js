const mongoose = require("mongoose");

const CategoryBlogSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    slug: {
      type: String
    },
    status: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CategoryBlog", CategoryBlogSchema);
