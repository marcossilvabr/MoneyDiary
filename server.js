"use strict";

require('dotenv').config();

const PORT      = process.env.PORT || 8080
const ENV       = process.env.ENV || "development"
const express   = require("express")
const app       = express()

app.set('view engine', 'ejs');

app.use(express.static('public'));

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

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT)
})