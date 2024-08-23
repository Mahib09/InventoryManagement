const express = require("express");
const {
  createProduct,
  getProducts,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();
router.get("/", getProducts);
router.post("/", createProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;
