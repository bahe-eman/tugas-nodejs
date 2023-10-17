const { user, product, order } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const login = async (req, res) => {
  try {
    delete req.dataUser.password;
    const token = jwt.sign(
      { username: req.body.username },
      process.env.JWT_SECRET,
      {
        expiresIn: 1800,
      }
    );
    fs.writeFileSync("src/current-active/token.txt", token);
    fs.writeFileSync("src/current-active/role.txt", req.dataUser.role);
    fs.writeFileSync("src/current-active/email.txt", req.dataUser.email);
    fs.writeFileSync("src/current-active/username.txt", req.dataUser.username);

    return res.status(200).send({
      message: "login succes...!",
      token: token,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const sigout = async (req, res) => {
  try {
    fs.writeFileSync("src/current-active/token.txt", "");
    await order.destroy({
      truncate: true,
    });
    return res.status(200).send({ message: "sigout success...!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, username, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const buildUser = user.build({
      firstname: firstname,
      lastname: lastname,
      email: email,
      username: username,
      password: hashedPassword,
      role: role,
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
    return res.status(200).send({ users: allUser });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const getByUsername = async (req, res) => {
  try {
    const result = await user.findOne({
      where: { username: req.params.username },
    });
    if (!result)
      return res.status(400).send({ message: "username not found...!" });
    return res.status(200).send({ product: result });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, email, username, password } = req.body;
    await user.update(
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: bcrypt.hashSync(password, 8),
      },
      { where: { username: req.params.username } }
    );
    return res.status(200).send({ message: "success updated...!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const delUser = async (req, res) => {
  try {
    await user.destroy({
      where: { username: req.body.username },
    });

    return res
      .status(200)
      .send({ message: `${req.body.username} has been deleted...!` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// ---------------------------------------------------------------------------------------------------------

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
    const { name, price, image, description } = req.body;
    await product.update(
      {
        name: name,
        price: price,
        image: image,
        description: description,
      },
      { where: { id: req.idProduct } }
    );
    return res.status(200).send({ message: "update...!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const delProduct = async (req, res) => {
  try {
    console.log(req.body.name);
    await product.destroy({
      where: { name: req.body.name },
    });
    return res.status(200).send(`${req.body.name} has been deleted...!`);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// ------------------------------------------------------------------------------

const orderProduct = (req, res) => {
  try {
    return res
      .status(200)
      .send({ message: `${req.body.name} has been order...!` });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  login,
  sigout,
  createUser,
  getAllUser,
  getByUsername,
  updateUser,
  delUser,
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  delProduct,
  orderProduct,
};
