const express = require("express");

const {
  login,
  sigout,
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
  orderProduct,
} = require("../controllers");
const {
  validateLogin,
  validateCreateUser,
  validateAddProduct,
  validateUpdatePoduct,
  validateDeleteUser,
  validateUpdateUser,
  validateDeleteProduct,
  validateOrderProduct,
} = require("../middlewares/validator");
const { verifyToken } = require("../middlewares/verify");
const router = express.Router();

router.post("/login", validateLogin, login);
router.delete("/sigout", sigout);
router.post("/user/create", verifyToken, validateCreateUser, createUser);
router.get("/users", verifyToken, getAllUser);
router.get("/user/:username", verifyToken, getByUsername);
router.delete("/user/delete", verifyToken, validateDeleteUser, delUser);
router.put(
  "/user/update/:username",
  verifyToken,
  validateUpdateUser,
  updateUser
);
// ---------------------------------------------------------------------------------------
router.post("/product/add", verifyToken, validateAddProduct, addProduct);
router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.delete(
  "/product/delete",
  verifyToken,
  validateDeleteProduct,
  delProduct
);
router.put(
  "/product/update/:id",
  verifyToken,
  validateUpdatePoduct,
  updateProduct
);
// ---------------------------------------
router.post("/order", verifyToken, validateOrderProduct, orderProduct);

module.exports = router;
