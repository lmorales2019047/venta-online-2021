"use strict"
const router = require("express").Router();
const productController = require("../controller/productController");

router.get("/all/product", productController.allProduct);

router.post("/add/product", productController.addProduct);

router.put("/update/product/:idproduct", productController.updateProduct);

router.delete("/delete/product/:idproduct", productController.deleteProduct);

router.get("/soldoutproduct", productController.soldOutProduct)

module.exports = router;