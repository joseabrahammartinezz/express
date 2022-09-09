const fs = require("fs");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");

exports.addProduct = catchAsync(async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        product_added: newProduct,
      },
    });
  });