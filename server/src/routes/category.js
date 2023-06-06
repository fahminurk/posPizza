const express = require("express");
const router = express.Router();
const categoryController = require("../controllers").categoryController;

router.get("/", categoryController.getAllCategory);

router.post("/", categoryController.createCategory);

router.patch("/:id", categoryController.editProduct);

router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
