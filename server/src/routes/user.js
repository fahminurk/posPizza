const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;
const { fileUploader } = require("../middlewares/multer");

//REGISTER user/admin
router.post(
  "/register",
  fileUploader({
    destinationFolder: "avatar",
  }).single("avatar"),
  userController.register
);
//get all
router.get("/", userController.getAllUser);

//login
router.post("/login", userController.login);

//delete user
router.delete("/:id", userController.deleteUser);

//edit user
router.patch(
  "/:id",
  fileUploader({
    destinationFolder: "avatar",
  }).single("avatar"),
  userController.editUser
);
//cek token saat login
router.get("/v3", userController.getByToken, userController.getUserByToken);

router.get("/token", userController.token);

module.exports = router;
