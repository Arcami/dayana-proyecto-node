const express = require("express");
const router = express.Router();
const { upload } = require("../../middleware/upload");
const {
  register,
  login,
  updateProfile,
  getAllUsers,
  getUser,
} = require("../controllers/user.controller");
const { auth } = require("../../middleware/auth");

router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.put("/profile", auth, updateProfile);
router.get("/allusers", getAllUsers);
router.get("/user/:userId", getUser);

module.exports = router;
