const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Product = require('../models/Product')
const Cart = require('../models/Cart')



router.get('/',(req, res) => {
   
  if(req.isAuthenticated()){
    Cart.findOne({userId:req.user._id})
   .then(data => {
     if(!data){
       res.send({user:req.user, cart:[]})
     }
     else
       res.send({user:req.user, cart:data.items})
    })
   .catch(err => res.status(400).send("cart load error"))
     
    
  }
  else {
      
      res.send({user:{}, cart:[]})
  }
})

router.get('/api/products', (req, res) => {
    Product.find().then(data => res.json(data) )
} )

router.post('/cart', (req, res) => {
  
  Cart.findOneAndUpdate({userId:req.user._id}, {items:req.body.cart},{upsert:true}, (err,data) => {
    if(err){
    
      res.status(400).send("updation error")
    }
    else{
      
      res.status(200).send("updation success")
    }
  })
})



module.exports = router