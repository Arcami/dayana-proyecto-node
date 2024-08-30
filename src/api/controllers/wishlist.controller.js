const mongoose = require("mongoose");
const Wishlist = require("../models/wishlist.model");

const getAllWishlists = async (req, res) => {
  try {
    const products = await Wishlist.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving products", error: error });
  }
};

const getUserWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const products = await Wishlist.find({ userId: userId });

    if (products.length === 0) {
      return res
        .status(200)
        .json({ message: "No products found for this user" });
    }

    if (!products) {
      return res.status(404);
    }
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving wishlist:", error);
    return res
      .status(500)
      .json({ message: "Error retrieving products", error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await Wishlist.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error retrieving product:", error);
    return res
      .status(500)
      .json({ message: "Error retrieving product", error: error.message });
  }
};

const addWishlistItem = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, price, link } = req.body;

    // Validate ObjectId
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const newItem = new Wishlist({
      name,
      price,
      link,
      userId,
    });

    const createdItem = await newItem.save();
    return res.status(201).json({
      message: "Product added to wishlist",
      data: createdItem,
    });
  } catch (error) {
    console.error("Error adding wishlist item:", error);
    return res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
};

const updateWishlistItem = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const { name, price, link, bought } = req.body;

    // Validate ObjectId
    if (
      !mongoose.isValidObjectId(userId) ||
      !mongoose.isValidObjectId(productId)
    ) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const updatedItem = await Wishlist.findOneAndUpdate(
      { _id: productId, userId: userId },
      { $set: { name, price, link, bought } },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res
        .status(404)
        .json({ message: "Product not found or does not belong to the user" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    console.error("Error updating wishlist item:", error);
    return res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

const deleteWishlistItem = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    if (
      !mongoose.isValidObjectId(userId) ||
      !mongoose.isValidObjectId(productId)
    ) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Check if the user is deleting their own items
    const item = await Wishlist.findOne({ _id: productId, userId: userId });
    if (!item) {
      return res.status(404).json({ message: "Product not found" });
    }

    const deletedItem = await Wishlist.findByIdAndDelete(productId);

    return res.status(200).json({
      message: "Product removed from wishlist",
      data: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    return res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

module.exports = {
  getAllWishlists,
  getUserWishlist,
  addWishlistItem,
  updateWishlistItem,
  deleteWishlistItem,
  getProduct,
};
