
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();
const path = require('path')

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})
.then(()=>console.log("Mongodb connected"))
.catch((err)=> console.log(err));


app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors({credentials: true, origin:'http://localhost:3000'}))

app.use(session({
  secret:"my secret",
  resave:true,
  saveUninitialized:false,
  store:new MongoStore({mongooseConnection:mongoose.connection})
}))

app.use(passport.initialize());
app.use(passport.session())

require('./passport/passport')(passport);

app.use("/", require('./Routes/index'));
app.use("/user", require('./Routes/user'));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('../build'));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,'../','build','index.html'))
  })

}

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server started on port ${PORT}`))
