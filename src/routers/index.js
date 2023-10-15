const express = require("express");

const {
  createUser,
  getAllUser,
  delUser,
  login,
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
} = require("../controllers");
const {
  validateCreateUser,
  validateLogin,
  validateAddProduct,
} = require("../middlewares/validator");
const { verifyToken } = require("../middlewares/verify");
const router = express.Router();

router.post("/create-user", validateCreateUser, createUser);
router.get("/get-users", getAllUser);
router.delete("/delete-user", verifyToken, delUser);
router.post("/login", validateLogin, login);
router.post("/add-product", verifyToken, validateAddProduct, addProduct);
router.get("/get-products", getProducts);
router.get("/:id", getProductById);
router.put("/update-product/:id", updateProduct);

module.exports = router;