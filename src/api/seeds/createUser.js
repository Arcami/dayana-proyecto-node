const mongoose = require("mongoose");
const User = require("../models/user.model");
const { connectDB } = require("../../utils/db");
const env = require("dotenv");

env.config(); // Load environment variables

connectDB();

const createUser = async () => {
  try {
    const newUser = new User({
      name: "Arnau Calderón",
      email: "arncalderon@gmail.com",
      password: "1234",
    });

    const savedUser = await newUser.save();
    console.log("Usuario creado:", savedUser);
  } catch (error) {
    console.log("Error al crear el usuario:save vs insertone", error);
  } finally {
    mongoose.connection.close();
  }
};

createUser();
