"use strict"
const router = require("express").Router();
const categoryController = require("../controller/categoryController")

router.get("/all/category", categoryController.allCategory);

router.post("/add/category", categoryController.addCategory);

router.put("/update/category/:idcategory", categoryController.updateCategory);

router.delete("/delete/category/:idcategory", categoryController.deleteCategory);

module.exports = router;