"use strict";

require('dotenv').config();

const PORT         = process.env.PORT || 8080
const ENV          = process.env.ENV || "development"
const express      = require("express")
const app          = express()
const mongoose     = require('mongoose')

const passport     = require('passport')
const flash        = require('connect-flash')
const session      = require('express-session')
const bodyParser   = require('body-parser')
const cookieParser = require('cookie-parser')
const bcrypt       = require('bcrypt')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser())
app.use(cookieParser())
app.use(session({ secret: 'secret' }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Database Configuration
const configDB = require('./config/database.js')
mongoose.connect(configDB.url, {
  useMongoClient: true
});


  // let adderSchema = mongoose.Schema({
  //   date: String,
  //   amount: Number,
  //   category: { type: String, required: true },
  //   note: { type: String, default: "N/A" },
  // })
  // let Data = mongoose.model('Data', adderSchema)

  // let userSchema = mongoose.Schema({
  //   firstName: String,
  //   lastName: String,
  //   email: String,
  //   password: String
  // })
  // let User = mongoose.model('User', userSchema)

// --> Cashflow Data Routing <-- //
const cashflowData = require('./routes/cashflowData.js')
app.use('/cashflowData', cashflowData())

// --> User Handlers <-- //
const user = require('./routes/user.js')
app.use('/user', user())



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
