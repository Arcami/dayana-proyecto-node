const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  //data--> {id, email}
  return jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  console.log("VERIFY :", jwt.verify(token, process.env.JWT_SECRET_KEY));
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
