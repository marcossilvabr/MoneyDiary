
const router       = require('express').Router()
const Data         = require('../models/data')
const bodyParser  = require('body-parser')

module.exports = () => {

  // Render Data Endpoint
  router.get("/", (req, res) => {
    let user = req.user._id
    Data.find({ user: user }, (err, data) => {
      if (err)
        res.send(err);

    let newData = { "data": [] }

    data.forEach((element, index, array) => {
      let dataItem = {
        DT_RowId : element['_id'],
        date     : element['date'],
        amount   : `${element['amount']}`,
        category : element['category'],
        note     : element['note'],
        }
      newData["data"].push(dataItem)
    })

    res.json(newData);
    })
  })

  // Put Cashflow Item into Database
  router.post("/", (req, res) => {

    let date     = req.body.djoined
    let amount   = Number(req.body.amount)
    let note     = req.body.note
    let category = req.body.category
    let datetime = Date.parse(req.body.djoined)

    category.forEach((index) => {
      if ( index != '' ) {
        category = index
      }
    })

    if ( !amount || (typeof amount) != 'number'  ) {

      req.flash('error', 'You must enter a valid amount')
      res.redirect('cashflow')

    } else if ( typeof category != 'string' ) {

      req.flash('error', 'You must enter a category')
      res.redirect('cashflow')

    } else if ( !date ) {

      req.flash('error', 'No date')
      res.redirect('cashflow')

    } else {

      let data      = new Data
      data.date     = date
      data.amount   = amount
      data.note     = note
      data.category = category
      data.user     = req.user._id
      data.datetime = datetime

      data.save((err) => {
        if (err)
          res.send(err)

          res.redirect('back')
      })

    }

  })

  // Delete Cashflow Item
  router.post("/delete/:id", (req, res) => {
    Data.remove({ _id: req.params.id }, (err) => {
      if (err)
        throw(err)
    })
  })

  return router

}


// .sort({ datetime: 1 }).exec(
