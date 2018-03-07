const firebase = require('firebase-admin')
const R = require('ramda')

class Firebase {
  constructor(client) {
    this.client = client
  }

  static getClient(serviceAccount) {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
      })
    }
    return firebase.firestore()
  }

  saveNotifications(notifications) {
    const batch = this.client.batch()

    R.map(notification => {
      const notiRef = this.client
        .collection('notifications')
        .doc(R.toString(notification.id))
      batch.set(notiRef, notification)
    }, notifications)

    return batch.commit()
  }
}

module.exports = Firebase
