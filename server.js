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

const user = require('./routes/user')

// const MongoClient = require('mongodb').MongoClient
const MongoURI = 'mongodb://localhost:27017/moneyDiary'
const mongoose = require('mongoose')
let db = mongoose.connect(MongoURI, {
  useMongoClient: true
});
// Mongoose schema
let Data
let User

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
  Data = mongoose.model('Data', adderSchema)

  let userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
  })
  User = mongoose.model('User', userSchema)

})


// Home Page
app.get("/", (req, res) => {
  res.render('index')
})

app.get("/cashflow", (req, res) => {
  res.render('cashflow')
})

app.get("/cashflowData", (req, res) => {
    Data.find((err, data) => {
      if (err)
        res.send(err);

    let newData = { "data": []}

    data.forEach((element, index, array) => {
      let dataItem = [
        `${element['date']}`,
        `${element['amount']}`,
        `${element['category']}`,
        `${element['note']}`
      ]
      newData["data"].push(dataItem)
    })

    res.json(newData);
  });
});

app.post("/cashflowData", (req, res) => {
  let amount = req.body.amount
  let note = req.body.note
  let category = req.body.category

  category.forEach((index) => {
    if ( index != '' ) {
      category = index
    }
  })

  let data = new Data
  data.date = `${(new Date()).getFullYear()}/${(new Date()).getMonth()+1}/${(new Date()).getDate()}`
  data.amount = amount
  data.note = note
  data.category = category

  data.save((err) => {
    if (err)
      res.send(err);

      res.redirect('back');
  });
})

app.get("/mortgage", (req, res) => {
  res.render('mortgage')
})

app.get("/investment", (req, res) => {
  res.render('investment')
})


// --> User Handlers <-- //

app.use('user', user)


// Port Listener
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT)
})
