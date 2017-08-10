"use strict";

require('dotenv').config();

const PORT       = process.env.PORT || 8080
const ENV        = process.env.ENV || "development"
const express    = require("express")
const app        = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// const MongoClient = require('mongodb').MongoClient
const MongoURI = 'mongodb://localhost:27017/moneyDiary'
const mongoose = require('mongoose')

// mongoose.connect(MongoURI)
let db = mongoose.connect(MongoURI, {
  useMongoClient: true
});
let Data

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log("we're connected!")

  let adderSchema = mongoose.Schema({
    date: String,
    amount: Number,
    category: String,
    note: { type: String, default: "N/A" },
  })
  Data = mongoose.model('Data', adderSchema)

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
    category = index
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
      // res.json({ message: 'Data created!' });
  });
})

app.get("/mortgage", (req, res) => {
  res.render('mortgage')
})

app.get("/investment", (req, res) => {
  res.render('investment')
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT)
})
