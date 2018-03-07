const mongoose = require('mongoose')

const Notification = mongoose.model('Notification', {
  repository: {
    fullName: String,
    id: String,
  },
  subject: {
    lastCommentUrl: String,
    url: String,
    title: String,
  },
  time: String,
  id: Number,
  unread: String,
})

module.exports = Notification
