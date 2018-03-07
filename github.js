const R = require('ramda')
const GitHubApi = require('@octokit/rest')
const { convertNotifications } = require('./utils')

class GitHub {
  constructor(client) {
    this.client = client
  }

  static getClient(token) {
    const github = new GitHubApi()
    github.authenticate({ type: 'token', token })
    return github
  }

  getNotifications(since) {
    const params = since ? { since } : {}
    return this.client.activity
      .getNotifications(params)
      .then(({ data }) => convertNotifications(data))
  }
}

module.exports = GitHub
