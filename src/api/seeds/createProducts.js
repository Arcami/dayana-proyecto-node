const mongoose = require("mongoose");
const Wishlist = require("../models/wishlist.model");
const { connectDB } = require("../../utils/db");
const env = require("dotenv");

env.config(); // Load environment variables

connectDB();

const userId = new mongoose.Types.ObjectId("66cb056a39ddbb81d97feed5");

const products = [
  {
    name: "Wireless Mouse",
    price: 29.99,
    link: "https://example.com/wireless-mouse",
    bought: false,
    userId: userId,
  },
  {
    name: "Bluetooth Headphones",
    price: 89.99,
    link: "https://example.com/bluetooth-headphones",
    bought: false,
    userId: userId,
  },
  {
    name: "External SSD",
    price: 129.99,
    link: "https://example.com/external-ssd",
    bought: false,
    userId: userId,
  },
  {
    name: "Smart Watch",
    price: 199.99,
    link: "https://example.com/smart-watch",
    bought: true,
    userId: userId,
  },
  {
    name: "Ergonomic Chair",
    price: 299.99,
    link: "https://example.com/ergonomic-chair",
    bought: false,
    userId: userId,
  },
];

const createProduct = async () => {
  try {
    await Wishlist.insertMany(products);
    console.log("Los productos han sido creados");
  } catch (error) {
    console.log("Error al crear los productos:", error);
  } finally {
    mongoose.connection.close();
  }
};

createProduct();
