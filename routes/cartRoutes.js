const express = require("express");
//const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const cartController = require("../controllers/cartController");
const cartRouter = express.Router();
//routes
cartRouter
  .route("/product")
  .all(authController.protect)
  .get(cartController.getAllProducts)
  .post(cartController.addProduct);
cartRouter
  .route("/product/:id")
  .all(authController.protect)
  .delete(cartController.deleteProductById);
cartRouter
  .route("/pay")
  .all(authController.protect)
  .post(cartController.payCart);

module.exports = cartRouter;
