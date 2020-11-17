const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports = function (passport){
   passport.serializeUser((user, done) => {
      done(null, user.id);
   })
   passport.deserializeUser((id, done) => {
       User.findById(id, (err, user) => {
           done(err, user)
       })
   })

   passport.use(new LocalStrategy({usernameField:'email'},
   (email, password, done) => {
        User.findOne({email:email})
    .then(user =>{
        if(!user){
         return done(null, false, {
             message:"Invalid Credentials"
         })
    }
        else{

        bcrypt.compare(password, user.password)
        .then(isCorrect => {
            if(isCorrect)
             return done(null, user)
             else{
             return done(null, false, {
                 message:"Invalid Credentials"
             })
        }
        } )
        .catch(err => {throw err})
    }
    } )
    .catch(err => {throw err})
   }
   ))

}

