"use strict";

require('dotenv').config();

// Main App
const PORT         = process.env.PORT || 8080
const ENV          = process.env.ENV || "development"
const express      = require("express")
const app          = express()
const mongoose     = require('mongoose')

// Authentication
const passport     = require('passport')
const flash        = require('connect-flash')
const session      = require('express-session')
const bodyParser   = require('body-parser')
const cookieParser = require('cookie-parser')

// Initialized Dependencies
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
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

// Passport Configuration
require('./config/passport')(passport)


// -> Core Routes <- //
// Landing Page
app.get("/landingPage", (req, res) => {
  res.render('landingPage')
})
// Home Page
app.get("/", (req, res) => {
  res.render('index')
})
// Cashflow
app.get("/cashflow", (req, res) => {
  res.render('cashflow')
})
// Mortgage Calculator
app.get("/mortgage", (req, res) => {
  res.render('mortgage')
})
// Investment Calculator
app.get("/investment", (req, res) => {
  res.render('investment')
})

// --> Cashflow Data Routing <-- //
const cashflowData = require('./routes/cashflowData.js')
app.use('/cashflowData', cashflowData())

// --> User Routing <-- //
const user = require('./routes/user.js')
app.use('/user', user(passport))


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next()

  res.redirect('/')
}

// -> Port Listener <- //
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT)
})
