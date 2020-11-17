const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Product = require('../models/Product')



router.get('/',(req, res) => {
  console.log("user:",req.user)
  if(req.isAuthenticated()){
     
    res.send(req.user)
  }
  else {
      
      res.send(null)
  }
})

router.get('/api/products', (req, res) => {
    Product.find().then(data => res.json(data) )
} )


module.exports = router