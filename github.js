const R = require('ramda')
const GitHubApi = require('@octokit/rest')

const convertNotifications = R.map(n => {
  return {
    repository: {
      fullName: n.repository.full_name,
      id: n.repository.id,
    },
    subject: {
      type: n.subject.type,
      latestCommentUrl: n.subject.latest_comment_url,
      url: n.subject.url,
      title: n.subject.title,
    },
    time: n.updated_at,
    id: parseInt(n.id),
    unread: n.unread,
  }
})

class GitHub {
  constructor(client) {
    this.client = client
  }

  static getClient(token) {
    const github = new GitHubApi()
    github.authenticate({ type: 'token', token })
    return github
  }

  getNotifications() {
    return this.client.activity
      .getNotifications()
      .then(({ data }) => convertNotifications(data))
  }
}

module.exports = GitHub
