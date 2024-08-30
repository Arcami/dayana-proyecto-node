const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const newUser = new User(req.body);

    if (req.file) {
      newUser.picture = req.file.path;
    }

    newUser.password = bcrypt.hashSync(newUser.password, 10);

    const createdUser = await User.create(newUser);

    const token = jwt.sign(
      { id: createdUser._id, email: createdUser.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    console.log(token, createdUser);

    return res.status(201).json({
      message: "Usuario creado correctamente",
      token: token,
      data: createdUser,
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return res.status(500).json({
      message: "Error al crear usuario",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  console.log("Dentro del login");
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res
        .status(400)
        .json({ message: "El usuario no se ha encontrado" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({
      message: "Inicio de sesión correcto",
      userId: user._id,
      token: token,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, password } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (name) {
      user.name = name;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();
    return res.status(200).json({
      message: "Perfil actualizado correctamente",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      message: "Error al actualizar perfil",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error: error });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error: error });
  }
};

module.exports = { register, login, updateProfile, getAllUsers, getUser };
