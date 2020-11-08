const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../models/User')




router.post('/register', (req, res) => {
    const {name, email, password} = req.body
   User.findOne({email:email})
   .then(user => {
       if(user){
           res.status(409).send("Email already registered")
       }
       else{
           bcrypt.hash(password, 10, (err, hashedPassword)=> {
               if(err) throw err;
               console.log(hashedPassword)
               let newUser = new User({name,email,password:hashedPassword})
               newUser.save(err => {
                   if(err) throw err
                   res.status(200).send("Registered Successfully. You can login now")
               })

           });
       }
   })
   .catch(err => {throw err})
} )


module.exports = router