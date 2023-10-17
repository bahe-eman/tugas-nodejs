const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { user } = require("../models");
const fs = require("fs");

const verifyToken = async (req, res, next) => {
  try {
    if (!(await user.findOne({ where: { username: "admin" } }))) {
      await user.create({
        firstname: "administrator",
        email: "admin@admin.com",
        username: "admin",
        password: bcrypt.hashSync("Admin@12345", 8),
        role: "admin",
      });
      console.log("admin success created...!");
    }
    const token = fs.readFileSync("src/current-active/token.txt", "utf-8");
    jwt.verify(token, process.env.JWT_SECRET);

    req.currenToken = fs.readFileSync("src/current-active/token.txt", "utf-8");
    req.currenRole = fs.readFileSync("src/current-active/role.txt", "utf-8");
    req.currenEmail = fs.readFileSync("src/current-active/email.txt", "utf-8");
    req.currenUsername = fs.readFileSync(
      "src/current-active/username.txt",
      "utf-8"
    );

    next();
  } catch (error) {
    return res.status(500).send({
      message: `you are not sigin, please sigin...!`,
    });
  }
};

module.exports = { verifyToken };
