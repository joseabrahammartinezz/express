const mongoose = require("mongoose");
const shopping_cartSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true
  },
  
});

const shopping_Cart = mongoose.model("shopping_cart", shopping_cartSchema);
module.exports = shopping_Cart;