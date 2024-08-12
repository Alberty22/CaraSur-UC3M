
const generateNotificationId = (user) => {
    const notificationIds = Object.keys(user.notifications)
    const lastNotificationId = notificationIds.length > 0 ? Math.max(...notificationIds.map(id => parseInt(id))) : 0
    return (lastNotificationId + 1).toString()
}

const generateLoanId = (user) => {
    const loanIds = Object.keys(user.loans)
    const lastlLoanId = loanIds.length > 0 ? Math.max(...loanIds.map(id => parseInt(id))) : 0
    return (lastlLoanId + 1).toString()
}

const generateProductId = (equipment) => {
    const equipmentIds = equipment.map(product => product.id)
    const lastEquipmentId = equipmentIds.length > 0 ? Math.max(...equipmentIds.map(id => parseInt(id))) : 0
    return (lastEquipmentId + 1).toString()
}

const generateActivityId = (activities) => {
    const activititesIds = activities.map(activity => activity.id)
    const lastActivityId = activititesIds.length > 0 ? Math.max(...activititesIds.map(id => parseInt(id))) : 0
    return (lastActivityId + 1).toString()
}

module.exports = {
    generateNotificationId,
    generateLoanId,
    generateProductId,
    generateActivityId
  }