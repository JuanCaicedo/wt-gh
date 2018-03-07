'use latest'
const R = require('ramda')
const { ManagementClient } = require('auth0')
const GitHub = require('./github')

module.exports = (ctx, done) => {
  const token = ctx.secrets.GH_TOKEN
  const github = new GitHub(GitHub.getClient(token))
  return github.getNotifications().then(notifications => {
    done(null, notifications)
  })
}
