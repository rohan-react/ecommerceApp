const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Product = require('../models/Product')



router.get('/api/products', (req, res) => {
    Product.find().then(data => res.json(data) )
} )

module.exports = router