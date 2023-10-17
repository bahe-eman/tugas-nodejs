const express = require("express");

const {
  login,
  createUser,
  getAllUser,
  delUser,
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateUser,
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
router.get("/get-users", verifyToken, getAllUser);
router.delete("/delete-user", verifyToken, validateDelUser, delUser);
router.put(
  "/update-user/:username",
  verifyToken,
  validateUpdateUser,
  updateUser
);
// ---------------------------------------------------------------------------------------
router.post("/add-product", verifyToken, validateAddProduct, addProduct);
router.get("/get-products", getProducts);
router.get("/:id", getProductById);
router.put(
  "/update-product/:id",
  verifyToken,
  validateUpdatePoduct,
  updateProduct
);

module.exports = router;
