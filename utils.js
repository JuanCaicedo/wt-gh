const R = require('ramda')

const getLastTime = R.reduce((time, notification) => {
  if (time >= notification.time) {
    return time
  }
  return notification.time
}, '')

const convertNotifications = R.map(n => {
  return {
    repository: {
      fullName: n.repository.full_name,
      id: n.repository.id,
    },
    subject: {
      latestCommentUrl: n.subject.latest_comment_url,
      url: n.subject.url,
      title: n.subject.title,
    },
    time: n.updated_at,
    id: parseInt(n.id),
    unread: n.unread,
  }
})

module.exports = {
  getLastTime,
  convertNotifications,
}
