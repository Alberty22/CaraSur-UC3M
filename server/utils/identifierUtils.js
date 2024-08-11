
const generateNotificationId = (user) => {
    const notificationIds = Object.keys(user.notifications)
    const lastNotificationId = notificationIds.length > 0 ? Math.max(...notificationIds.map(id => parseInt(id))) : 0
    return (lastNotificationId + 1).toString()
}

module.exports = {
    generateNotificationId
  }