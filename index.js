'use latest'
const R = require('ramda')
const GitHub = require('./github')
const Db = require('./db')

module.exports = (ctx, done) => {
  const { GH_TOKEN, MONGO_URL } = ctx.secrets
  const { user_name: userName } = ctx.data

  const github = new GitHub(GitHub.getClient(GH_TOKEN))

  return Db.getClient(MONGO_URL)
    .then(() => Db.findLastTime(userName))
    .then(lastTime => github.getNotifications(lastTime))
    .then(notifications => Db.saveNotifications(userName, notifications))
    .then(result => {
      if (!result) {
        return done(null, 'No new notifications')
      }
      return done(null, 'Saved notifications successfully')
    })
    .catch(err => done(err))
}
