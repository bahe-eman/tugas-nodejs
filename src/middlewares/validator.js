const bcrypt = require("bcrypt");
const validator = require("validator");
const { user, product } = require("../models");

const validateLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).send({ message: "some field is missing...!" });
    const getUser = await user.findOne({ where: { username: username } });
    if (!getUser)
      return res.status(404).send({ message: `${username} is not found ...!` });
    const isValidPasswor = bcrypt.compareSync(
      password,
      getUser.dataValues.password
    );
    if (!isValidPasswor)
      return res.status(400).send({ message: "invalid password...!" });

    // res.dataUser = getUser.dataValues;
    next();
  } catch (error) {
    return res
      .status(500)
      .send({ message: `error on validation - ${error.message}` });
  }
};

const validateCreateUser = async (req, res, next) => {
  try {
    console.log(req);
    const { firstname, email, username, password } = req.body;

    if (!firstname || !email || !username || !password)
      res.status(401).send({ message: "some field is missing...!" });

    if (
      (await user.findOne({ where: { email: email } })) ||
      (await user.findOne({ where: { username: username } }))
    )
      return res
        .status(500)
        .send({ message: "username or email has been used...!" });

    const validEmail = validator.isEmail(email);
    if (!validEmail)
      return res.status(500).send({ message: "email is invalid...!" });
    console.log(validEmail);

    const strongPassword = validator.isStrongPassword(password);
    if (!strongPassword)
      return res
        .status(400)
        .send({ message: "password is not strong, failed create user...!" });

    next();
  } catch (error) {
    return res
      .status(500)
      .send({ message: `error validation - ${error.message}` });
  }
};

const validateAddProduct = async (req, res, next) => {
  try {
    const { name, price, image, description } = req.body;
    if (!(req.currenRole.toLowerCase() == "admin"))
      return res
        .status(500)
        .send({ message: "access denial, you are not admin...!" });
    if (!name || !price || !image || !description)
      return res.status(401).send({ message: "some field is missing...!" });

    const getStatus = await product.findOne({ where: { name: name } });
    if (getStatus)
      return res.status(500).send({ message: "product telah tersedia...!" });

    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const validateUpdatePoduct = async (req, res, next) => {
  try {
    const { name, price, image, description } = req.body;
    const { id } = req.params;
    if (!(req.currenRole.toLowerCase() == "admin"))
      return res
        .status(500)
        .send({ message: "access denial, you are not admin...!" });
    if (!name || !price || !image || !description)
      return res.status(401).send({ message: "some field is missing...!" });
    if (!(await product.findOne({ where: { id: id } })))
      return res.status(400).send({ message: `product is not found...!` });
    if (await product.findOne({ where: { name: name } }))
      return res.status(400).send({ message: `${name} has used...!` });

    req.idProduct = id;
    next();
  } catch (error) {
    return res
      .status(500)
      .send({ message: `error on validate - ${error.message}` });
  }
};

const validateDelUser = async (req, res, next) => {
  try {
    const { username } = req.body;
    if (!(req.currenRole.toLowerCase() == "admin"))
      return res
        .status(500)
        .send({ message: "access denial, you are not admin...!" });
    const isTrue = await user.findOne({
      where: { username: username },
    });
    if (!isTrue)
      return res.status(404).send({ message: `${username} is not found...!` });

    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const validateUpdateUser = async (req, res, next) => {
  try {
    if (!(req.currenRole.toLowerCase() == "admin"))
      return res
        .status(500)
        .send({ message: "access denial, you are not admin...!" });
    if (
      req.params.username.toLowerCase() == "admin" ||
      req.body.username.toLowerCase() == "admin"
    )
      return res.status(401).send({
        message: "cant change username: admin...!",
      });
    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  validateCreateUser,
  validateLogin,
  validateAddProduct,
  validateUpdatePoduct,
  validateDelUser,
  validateUpdateUser,
};
