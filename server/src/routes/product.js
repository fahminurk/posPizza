const express = require("express");
const { fileUploader } = require("../middlewares/multer");
const router = express.Router();
const productController = require("../controllers").productController;

//get all product
router.get("/", productController.getAllProduct);
// router.get("/v1", productController.getAllProduct);

//edit product
router.patch(
  "/:id",
  fileUploader({
    destinationFolder: "product",
  }).single("product"),
  productController.editProduct
);

//new product
router.post(
  "/newProduct",
  fileUploader({
    destinationFolder: "product",
  }).single("product"),
  productController.createNewProduct
);

//delete product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
