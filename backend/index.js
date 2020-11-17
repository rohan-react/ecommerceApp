const { TrendingUpRounded } = require('@material-ui/icons');
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
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

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('server started on port', PORT))
