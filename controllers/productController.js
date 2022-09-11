const fs = require("fs");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
});

exports.addProduct = catchAsync(async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.getProductById = catchAsync(async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});

exports.deleteProductById = catchAsync(async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  const products = await Product.find();
  console.log(deletedProduct);
  res.status(200).json({
    status: "success",
    data: {
      product_deleted: deletedProduct,
      products: products,
    },
  });
});

exports.updateProductById = catchAsync(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    data: {
      product_updated: updatedProduct,
      products: products,
    },
  });
});