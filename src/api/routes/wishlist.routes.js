const express = require("express");
const router = express.Router();
const {
  getAllWishlists,
  getUserWishlist,
  addWishlistItem,
  updateWishlistItem,
  deleteWishlistItem,
  getProduct,
} = require("../controllers/wishlist.controller");
const { auth, isUserOwner } = require("../../middleware/auth");

router.get("/", getAllWishlists);
router.get("/:userId", getUserWishlist);
router.get("/product/:productId", getProduct);
router.post("/:userId/add", [auth, isUserOwner], addWishlistItem);
router.put(
  "/:userId/update/:productId",
  [auth, isUserOwner],
  updateWishlistItem
);
router.delete(
  "/:userId/delete/:productId",
  [auth, isUserOwner],
  deleteWishlistItem
);

module.exports = router;
