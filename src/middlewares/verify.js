const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { user } = require("../models");
const fs = require("fs");

const verifyToken = async (req, res, next) => {
  try {
    if (!(await user.findOne({ where: { username: "admin" } }))) {
      await user.create({
        firstname: "administrator",
        email: "admin@gmail.com",
        username: "admin",
        password: bcrypt.hashSync("Admin@12345", 8),
        role: "admin",
      });
    }
    const token = fs.readFileSync("src/token/token.txt", "utf-8");
    jwt.verify(token, process.env.JWT_SECRET);
    req.currenRole = fs.readFileSync("src/token/current-role.txt", "utf-8");
    req.currenToken = fs.readFileSync("src/token/token.txt", "utf-8");
    next();
  } catch (error) {
    return res.status(500).send({
      message: `error on verify token, token not found - ${error.message}`,
    });
  }
};

module.exports = { verifyToken };
