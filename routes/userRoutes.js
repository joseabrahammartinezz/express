const express = require("express");
const productController = require("./../controllers/userController");
const userRouter = express.Router();
//routes
userRouter
  .route("/")
  //.get(productController.getAllProducts)
  .post(productController.addProduct);

module.exports = userRouter;

