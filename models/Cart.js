const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  userId:{
      type:mongoose.ObjectId
  },
  items:{
      type:Array
  }

})
const Cart = mongoose.model("Cart", CartSchema)

module.exports = Cart