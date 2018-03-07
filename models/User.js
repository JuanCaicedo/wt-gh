const mongoose = require('mongoose')

const User = mongoose.model('User', {
  userName: String,
  time: String,
})

module.exports = User
