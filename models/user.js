const mongoose = require('mongoose')

let userSchema = mongoose.Schema({

  email: String,
  password: String

})

module.exports = mongoose.model('User', userSchema)
