const mongoose = require('mongoose')
const R = require('ramda')
const Notification = require('./models/Notification')
const User = require('./models/User')
const { getLastTime } = require('./utils')

const getClient = url => {
  return mongoose.connect(url)
}

const saveNotifications = (userName, notifications) => {
  if (R.isEmpty(notifications)) return null

  return Notification.create([...notifications])
    .then(() => getLastTime(notifications))
    .then(lastTime => updateLastSync(userName, lastTime))
}

const updateLastSync = (userName, time) => {
  return User.update({ userName }, { $set: { time } }, { upsert: true })
}

const findLastTime = userName => {
  return User.findOne({ userName }).then(user => {
    if (!user) return null
    return user.time
  })
}

module.exports = {
  getClient,
  saveNotifications,
  updateLastSync,
  findLastTime,
}
