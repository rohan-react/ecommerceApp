const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
id:{
    type:Number
},
title:{
    type:String,
},
url:{
    type:String
},
price:{
   type: String,
},
rating:{
    type:Number
},
category:{
    type:String
},
orders:{
    type:String
},
inCart:{
    type:Boolean
},
quantity:{
   type:Number
}


})

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product