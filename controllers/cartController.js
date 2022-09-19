const fs = require("fs");
const shoppingCart = require("../models/Shopping_cart");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res) => {
  const shoppingCarts = await shoppingCart.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: shoppingCarts.length,
    data: {
      shoppingCarts,
    },
  });
   
});

exports.addProduct = catchAsync(async (req, res) => {
  let shoppin_cart_real = await shoppingCart.updateOne ({status:"PENDING"},
      {$push:{products:
          {
            "id": req.body.id,
            "name": req.body.name,
            "price": req.body.price,
            "quantity": req.body.quantity
          }
      }
      });
    if (shoppin_cart_real.modifiedCount==0){
      const newshoppingCart = await shoppingCart.create(req.body);
      res.status(200).json({
        status: "success",
        data: {
          shoppingCart: newshoppingCart,
        },
      });
    }
    else{
      res.status(200).json({
        status: "success",
        timeOfRequest: req.requestTime,
        data: {
          shoppin_cart_real,
        },
      });
    }
});

exports.deleteProductById = catchAsync(async (req, res) => {
 // console.log ("ingreso");
 // db.people.find({ friends: { id:1, name:"Trinity Ford" } })
  const filter = {status:"PENDING",products: { id:req.params.id }} ;
  const doc = { $set: { products: products.filter(products => products.id != req.params.id)} };
  const options = { new: true };
  const deletedProduct = await shoppingCart.findOneAndUpdate(filter, doc, options, (err, doc) => {
    if (err) console.log("Something wrong when elimnating product!");
    //console.log(doc);
});
  //console.log("deleted "+  deletedProduct);
 
  res.status(200).json({
    status: "product eliminated",
    data: {
      product_deleted: deletedProduct,
    },
  });
});

exports.payCart = catchAsync(async (req, res) => {
 
  const nro_carritos = await shoppingCart.findOne({status:"PENDING", products:{$exists:true}} ).count();
  if (nro_carritos >0){
    const filter = {status:"PENDING", products:{$exists:true}} ;
    const doc = { $set: {status:"PAID"} };
    const options = { new: true };
    const updatedcart =shoppingCart.findOneAndUpdate(filter, doc, options, (err, doc) => {
        if (err) console.log("Something wrong when updating data!");
        //console.log(doc);
    });
    console.log(updatedcart);
    res.status(200).json({
      status: "CART PAID",
      data: {
        cart: "updatedcart",
      },
    });
  }
  else{
    res.status(200).json({
      status: "NO CARTS TO PAY",
    });
  }
  
});  



