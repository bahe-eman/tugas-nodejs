const { user, product } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

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

    res.status(200).send({ message: `${username} has been created...!` });
  } catch (error) {
    return res
      .status(400)
      .send({ message: `error on create user - ${error.message}` });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUser = await user.findAll();
    // if (allUser == [])
    //   return res.status(400).send({ message: "user is empty...!" });
    return res.status(200).send({ users: allUser });
  } catch (error) {
    return res.status(500).send({ message: error.message });
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
    console.log(req);
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
    console.log(req);
    const { name, price, image, description } = req.body;
    if (!(req.currentUser.toLowerCase() == "admin"))
      return res.status(500).send({ message: "access denial...!" });
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

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const productById = await product.findOne({ where: { id: id } });

    if (!productById)
      return res.status(404).send({ message: "product is not fount..,!" });
    return res.status(200).send({ product: productById });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image, description } = req.body;
    await product.update(
      {
        name: name,
        price: price,
        image: image,
        description: description,
      },
      { where: { id: id } }
    );
    return res.status(200).send({ message: "update...!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUser,
  delUser,
  login,
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
};
