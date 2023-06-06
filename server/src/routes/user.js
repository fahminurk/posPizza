const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;
const { fileUploader } = require("../middlewares/multer");
//register cashier
router.post("/registerCashier", userController.registerCashier);

//REGISTER ADMIN
router.post(
  "/registerAdmin",
  fileUploader({
    destinationFolder: "avatar",
  }).single("avatar"),
  userController.registerAdmin
);

//get all
router.get("/", userController.getAllUser);

//login
router.post("/login", userController.login);

//token
router.get("/v3", userController.getByToken, userController.getUserByToken);

module.exports = router;
