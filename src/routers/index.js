const express = require("express");

const {
  login,
  createUser,
  getAllUser,
  getByUsername,
  delUser,
  updateUser,
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  delProduct,
} = require("../controllers");
const {
  validateLogin,
  validateCreateUser,
  validateAddProduct,
  validateUpdatePoduct,
  validateDelUser,
  validateUpdateUser,
} = require("../middlewares/validator");
const { verifyToken } = require("../middlewares/verify");
const router = express.Router();

router.post("/login", validateLogin, login);
router.post("/create-user", verifyToken, validateCreateUser, createUser);
router.get("/users", verifyToken, getAllUser);
router.get("/user/:username", verifyToken, getByUsername);
router.delete("/delete-user", verifyToken, validateDelUser, delUser);
router.put(
  "/update-user/:username",
  verifyToken,
  validateUpdateUser,
  updateUser
);
// ---------------------------------------------------------------------------------------
router.post("/add-product", verifyToken, validateAddProduct, addProduct);
router.get("/products", verifyToken, getProducts);
router.get("/product/:id", verifyToken, getProductById);
router.delete("/del-product/delProduct");
router.put(
  "/update-product/:id",
  verifyToken,
  validateUpdatePoduct,
  updateProduct
);

module.exports = router;
