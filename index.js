'use latest'
const R = require('ramda')
const { ManagementClient } = require('auth0')
const GitHub = require('./github')
const Firebase = require('./firebase')
const serviceAccount = require('./service-account')

module.exports = (ctx, done) => {
  const { GH_TOKEN: ghToken } = ctx.secrets
  const github = new GitHub(GitHub.getClient(ghToken))
  const firebase = new Firebase(Firebase.getClient(serviceAccount))

  return github
    .getNotifications()
    .then(notifications => firebase.saveNotifications(notifications))
    .then(() => done(null, 'Saved notifications successfully'))
    .catch(err => done(err))
}
