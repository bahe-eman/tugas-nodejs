const express = require("express");

const {
  welcome,
  createUser,
  delUser,
  login,
  addProduct,
  getProducts,
} = require("../controllers");
const {
  validateCreateUser,
  validateLogin,
  validateAddProduct,
} = require("../middlewares/validator");
const { verifyToken } = require("../middlewares/verify");
const router = express.Router();

router.get("/welcome", welcome);
router.post("/create-user", validateCreateUser, createUser);
router.delete("/delete-user", verifyToken, delUser);
router.post("/login", validateLogin, login);
router.post("/add-product", verifyToken, validateAddProduct, addProduct);
router.get("/get-products", getProducts);

module.exports = router;
