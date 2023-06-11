const express = require("express");
const router = express.Router();
const orderDetailController = require("../controllers").orderDetailController;

router.get("/", orderDetailController.getAll);

module.exports = router;
