const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    dimension: {
      type: String
    },
    color: {
      type: String
    },
    quantity: {
      type: Number,
      default: 0
    },
    p_image: {
      type: String
    },
    wishlist: {
      type: Boolean,
      default: false
    },
    add_to_cart: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
