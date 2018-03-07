'use latest'
const R = require('ramda')
const GitHub = require('./github')
const Mongo = require('./mongo')

module.exports = (ctx, done) => {
  const { GH_TOKEN, MONGO_URL } = ctx.secrets
  const github = new GitHub(GitHub.getClient(GH_TOKEN))

  let mongo
  return Mongo.getClient(MONGO_URL)
    .then(client => new Mongo(client))
    .then(instance => (mongo = instance))
    .then(() => github.getNotifications())
    .then(notifications => mongo.saveNotifications(notifications))
    .then(() => done(null, 'Saved notifications successfully'))
    .catch(err => done(err))
}
