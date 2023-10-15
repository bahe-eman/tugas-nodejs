const jwt = require("jsonwebtoken");
const fs = require("fs");

const verifyToken = (req, res, next) => {
  try {
    const token = fs.readFileSync("src/token/token.txt", "utf-8");
    jwt.verify(token, process.env.JWT_SECRET);
    req.currentUser = fs.readFileSync("src/token/current-user.txt", "utf-8");
    next();
  } catch (error) {
    return res.status(500).send({
      message: `error on verify token, token not found - ${error.message}`,
    });
  }
};

module.exports = { verifyToken };
