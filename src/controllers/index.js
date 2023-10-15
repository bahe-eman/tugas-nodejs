const { user, product } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const fs = require("fs");

const welcome = (req, res) => {
  res.status(200).send({ message: "welcome....!" });
};

const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const buildUser = user.build({
      firstname: firstname,
      lastname: lastname,
      email: email,
      username: username,
      password: hashedPassword,
    });
    await buildUser.save();

    res.status(200).send({ message: "User has been created...!" });
  } catch (error) {
    return res
      .status(400)
      .send({ message: `error on create user - ${error.message}` });
  }
};

const delUser = async (req, res) => {
  try {
    const { username } = req.body;
    const isTrue = await user.findOne({
      where: { username: username },
    });
    if (!isTrue)
      return res.status(404).send({ message: `${username} is not found...!` });
    await user.destroy({
      where: { username: username },
    });

    return res
      .status(200)
      .send({ message: `${username} has been deleted...!` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const currentUser = req.body.username;
    const token = jwt.sign({ username: currentUser }, process.env.JWT_SECRET, {
      expiresIn: 100,
    });
    fs.writeFileSync("src/token/token.txt", token);
    fs.writeFileSync("src/token/current-user.txt", currentUser);

    return res.status(200).send({
      message: "login succes...!",
      "current user": currentUser,
      token: token,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, image, description } = req.body;
    await product.create({
      name: name,
      price: price,
      image: image,
      description: description,
    });
    return res.status(200).send({ message: `product has been added...!` });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await product.findAll();
    if (!products)
      return res.status(404).send({ message: "products not found...!" });
    return res.status(200).send({ products: products });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  welcome,
  createUser,
  delUser,
  login,
  addProduct,
  getProducts,
};
