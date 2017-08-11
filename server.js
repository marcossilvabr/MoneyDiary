"use strict";

require('dotenv').config();

const PORT       = process.env.PORT || 8080
const ENV        = process.env.ENV || "development"
const express    = require("express")
const app        = express()
const bodyParser = require('body-parser')
const bcrypt     = require('bcrypt');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// const MongoClient = require('mongodb').MongoClient
const MongoURI = 'mongodb://localhost:27017/moneyDiary'
const mongoose = require('mongoose')
let db = mongoose.connect(MongoURI, {
  useMongoClient: true
});

// db connection and schema storage
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log("we're connected!")

  let adderSchema = mongoose.Schema({
    date: String,
    amount: Number,
    category: { type: String, required: true },
    note: { type: String, default: "N/A" },
  })
  let Data = mongoose.model('Data', adderSchema)

  let userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
  })
  let User = mongoose.model('User', userSchema)

  // --> Cashflow Data Routing <-- //
  const cashflowData = require('./routes/cashflowData.js')
  app.use('/cashflowData', cashflowData(db, Data))

  // --> User Handlers <-- //
  const user = require('./routes/user.js')
  app.use('/user', user(db, User))

})


// Home Page
app.get("/", (req, res) => {
  res.render('index')
})

app.get("/cashflow", (req, res) => {
  res.render('cashflow')
})

app.get("/mortgage", (req, res) => {
  res.render('mortgage')
})

app.get("/investment", (req, res) => {
  res.render('investment')
})


// Port Listener
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT)
})
