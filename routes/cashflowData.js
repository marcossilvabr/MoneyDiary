
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

    data.forEach(( element ) => {
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

  router.get("/categories", (req, res) => {

    let user = req.user._id
    Data.find({ user: user }).sort({ datetime: 1 }).exec((err, data) => {
      if (err)
        res.send(err);


    let newData

    function categoryTotal(data) {

      let dataObject = {}
      let dataArray  = []

      data.forEach(( element ) => {
        let month    = element['date'].split('/', 2).join('/')
        let category = element['category']
        let amount   = Number(element['amount'])

        if ( !dataObject[category] ) {
          dataObject[category] = [{ month  : month,
                                    amount : Number(amount) }]

        } else if ( dataObject[category] ) {

          dataObject[category].forEach(( element, index ) => {

            if ( dataObject[category][index]['month'] == month ) {

              dataObject[category][index]['amount'] += Number(amount)

            }

            if ( index == dataObject[category].length-1 ) {

              if ( dataObject[category][index]['month'] != month ) {

                dataObject[category].push({ month  : month,
                                            amount : amount })

              }
            }
          })
        }
      })

      let finalArray = []

      for ( category in dataObject ) {

        let categoryArray = dataObject[category]

        finalArray.push({ category : category, amount : [] })

        categoryArray.forEach(( element, index ) => {

          let date = element['month'].split('/', 2)[1]
          let place = finalArray.length-1

          if ( index == 0) {

            for ( let i = 1 ; i <= 12; i++ ) {

              if ( date == i ) {
                finalArray[place]['amount'].push(Number(element['amount']))
              } else {
                finalArray[place]['amount'].push(0)
              }
            }

          } else {

            finalArray[place]['amount'][Number(date)-1] += Math.round(element['amount'] * 100) / 100

          }
        })
      }
      return finalArray
    }

    newData = { data : categoryTotal(data) }

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
