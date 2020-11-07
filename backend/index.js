const { TrendingUpRounded } = require('@material-ui/icons');
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:TrendingUpRounded,
    useUnifiedTopology:true
})
.then(()=>console.log("Mongodb connected"))
.catch((err)=> console.log(err));

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions))

app.use("/", require('./Routes/index'));

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('server started on port', PORT))
