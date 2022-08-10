const mogoose = require("mongoose");

const ProductSchema = mogoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mogoose.model("Product", ProductSchema);
