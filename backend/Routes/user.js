const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../models/User');
const passport = require('passport');




router.post('/register', (req, res) => {
    const {name, email, password} = req.body
   User.findOne({email:email})
   .then(user => {
       if(user){
           res.status(409).send({error:true,info:"Email already exists"})
       }
       else{
           bcrypt.hash(password, 10, (err, hashedPassword)=> {
               if(err) throw err;
               let newUser = new User({name,email,password:hashedPassword})
               newUser.save(err => {
                   if(err) throw err
                   res.status(200).send({error:false, info:"Registered Successfully. You can login now"})
               })

           });
       }
   })
   .catch(err => {throw err})
} )

router.post("/login", (req, res) => {
    passport.authenticate("local", (err, user, info) => {
        if(!user){
            res.status(401).send(info.message)
        }
        else{
            req.login(user, (err) => {
                if(err) throw err
                else {
                 res.status(200).send(user)
                }
            })
            
         }
      }
    )(req, res)
}
)

router.get("/logout", (req, res) => {
  res.clearCookie('connect.sid')
  req.session.destroy(() => {
   res.status(200).send('success')
  })
 
  
});


    

module.exports = router