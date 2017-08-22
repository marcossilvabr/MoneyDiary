const mongoose = require('mongoose')

let adderSchema = mongoose.Schema({

  date     : String,
  amount   : Number,
  category : { type: String, required: true },
  note     : { type: String, default: "N/A" },
  user     : String,
  datetime : Date

})

module.exports = mongoose.model('Data', adderSchema)
