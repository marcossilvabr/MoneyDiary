const mongoose = require('mongoose')

let userSchema = mongoose.Schema({

  firstName: String,
  lastName: String,
  email: String,
  password: String
  
})

module.exports = mongoose.model('User', userSchema)
