const jwt = require("jsonwebtoken");
const User = require("../api/models/user.model");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "No se ha proporcionado token de autenticación" });
  }

  const token = authHeader.split(" ")[1]; // Asume que el token está en el formato "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: "No hay token" });
  }

  console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);
  console.log(token);

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = user; // Agrega el usuario a la solicitud para uso en los controladores
      console.log(
        "Estamos dentro del auth. Se ha autorizado al usuario y se pasará la siguiente información a la próxima función:",
        user._id
      );
      next();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

const isUserOwner = (req, res, next) => {
  const userIdFromParams = req.params.userId || req.body.userId; // Adjust based on the source of userId
  if (userIdFromParams !== req.user._id.toString()) {
    return res.status(403).json({
      message: "Forbidden: You can only modify your own data",
    });
  }
  next();
};

module.exports = { auth, isUserOwner };
