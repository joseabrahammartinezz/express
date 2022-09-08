const fs = require("fs");
const Product = require("../models/Product");

exports.getAllProducts = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  products.push(req.body);
  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
};

exports.getProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundProduct = products.find((p) => p.id == req.params.id);
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
};

exports.deleteProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  
  let productsArray = products.filter(products => products.id != req.params.id);
  //console.log(productsArray);
  fs.writeFileSync(`${__dirname}/../data/products.json`,  JSON.stringify(productsArray));  
  res.status(204).json({
    status: "success",
    data: {
      product: productsArray,
    },
  });
};

exports.updateProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  const datos = req.body;

  const productsArray = products.map((o,i) =>{
    if (o.id == req.params.id) {
      o.name=datos.name;
      o.price=datos.price;
      o.category=datos.category;
    }
    return o;
  });
  //console.log(productsArray);
  fs.writeFileSync(`${__dirname}/../data/products.json`,  JSON.stringify(productsArray)); 
  res.status(200).json({
    status: "success",
    data: {
      products: productsArray,
    },
  });
};
