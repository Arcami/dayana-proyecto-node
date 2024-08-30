const express = require("express");
const { connectDB } = require("./src/utils/db");
const env = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

env.config();
connectDB();

const server = express();
const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

server.use(express.json());
server.use(cors());

const userRoute = require("./src/api/routes/user.routes");
server.use("/", userRoute);

const wishlistRoute = require("./src/api/routes/wishlist.routes");
server.use("/wishlist", wishlistRoute);

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
