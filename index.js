'use latest'
const R = require('ramda')
const GitHub = require('./github')
const Mongo = require('./mongo')

module.exports = (ctx, done) => {
  const { GH_TOKEN, MONGO_URL } = ctx.secrets
  const { user_name: userName } = ctx.data
  const github = new GitHub(GitHub.getClient(GH_TOKEN))

  let mongo
  return Mongo.getClient(MONGO_URL)
    .then(client => new Mongo(client))
    .then(instance => (mongo = instance))
    .then(() => mongo.getLastTime(userName))
    .then(lastTime => github.getNotifications(lastTime))
    .then(notifications => mongo.saveNotifications(userName, notifications))
    .then(result => {
      if (!result) {
        return done(null, 'No new Notifications')
      }
      done(null, 'Saved notifications successfully')
    })
    .catch(err => done(err))
}
