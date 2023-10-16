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
  updateUser,
} = require("../controllers");
const {
  validateCreateUser,
  validateLogin,
  validateAddProduct,
  validateUpdatePoduct,
  validateDelUser,
  validateUpdateUser,
} = require("../middlewares/validator");
const { verifyToken } = require("../middlewares/verify");
const router = express.Router();

router.post("/create-user", validateCreateUser, createUser);
router.get("/get-users", getAllUser);
router.delete("/delete-user", verifyToken, validateDelUser, delUser);
router.post("/login", validateLogin, login);
router.post("/add-product", verifyToken, validateAddProduct, addProduct);
router.get("/get-products", getProducts);
router.get("/:id", getProductById);
router.put(
  "/update-product/:id",
  verifyToken,
  validateUpdatePoduct,
  updateProduct
);
router.put(
  "/update-user/:username",
  verifyToken,
  validateUpdateUser,
  updateUser
);

module.exports = router;
