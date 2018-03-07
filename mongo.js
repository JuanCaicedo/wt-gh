const mongoose = require('mongoose')

class Mongo {
  constructor(client) {
    this.client = client
  }

  static getClient(url) {
    return mongoose.connect(url)
  }

  saveNotifications(notifications) {
    const Notifications = mongoose.model('Notifications', {
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
    return Notifications.create([...notifications])
  }
}

module.exports = Mongo
