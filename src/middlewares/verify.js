const jwt = require("jsonwebtoken");
const fs = require("fs");

const verifyToken = (req, res, next) => {
  try {
    const token = fs.readFileSync("src/token/token.txt", "utf-8");
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(500).send({
      message: `error on verify token, token not found - ${error.message}`,
    });
  }
};

const verifyUser = async (req, res, next) => {
  try {
    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { verifyToken };
