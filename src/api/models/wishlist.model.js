const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  link: { type: String, required: false },
  bought: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who added the product
});

const Wishlist = mongoose.model("Product", wishlistSchema);

module.exports = Wishlist;
