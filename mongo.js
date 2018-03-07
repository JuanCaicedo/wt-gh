const mongoose = require('mongoose')
const R = require('ramda')

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

const User = mongoose.model('User', {
  userName: String,
  time: String,
})

const getLastTime = R.reduce((time, notification) => {
  if (time >= notification.time) {
    return time
  }
  return notification.time
}, '')

class Mongo {
  constructor(client) {
    this.client = client
  }

  static getClient(url) {
    return mongoose.connect(url)
  }

  saveNotifications(userName, notifications) {
    if (R.isEmpty(notifications)) return null

    return Notifications.create([...notifications])
      .then(() => getLastTime(notifications))
      .then(lastTime => this.updateLastSync(userName, lastTime))
  }

  updateLastSync(userName, time) {
    return User.update({ userName }, { $set: { time } }, { upsert: true })
  }

  getLastTime(userName) {
    return User.findOne({ userName }).then(user => {
      if (!user) return null
      return user.time
    })
  }
}

module.exports = Mongo
