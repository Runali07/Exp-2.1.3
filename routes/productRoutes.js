const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.post("/product", controller.createProduct);
router.get("/products", controller.getProducts);
router.get("/low-stock", controller.getLowStockProducts);
router.get("/category-ratings", controller.categoryRatings);

module.exports = router;