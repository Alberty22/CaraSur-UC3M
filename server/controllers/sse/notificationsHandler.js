let notificationClients = []

function notificationEventsHandler(req, res) {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const { email } = req.params
    const clientId = email

    if (!clientId) {
        res.writeHead(400, { 'Content-Type': 'text/plain' })
        res.end('clientId is required')
        return;
    }
    
    const newClient = {
        id: clientId,
        res
    }

    notificationClients.push(newClient)
    newClient.res.write(`data: ${JSON.stringify({ message: 'first' })}\n\n`)

    req.on('close', () => {
        notificationClients = notificationClients.filter(client => client.id !== clientId);
    })
}

function sendNotificationToClient(clientId, message) {
    const client = notificationClients.find(client => client.id === clientId)
    if (client) {
        client.res.write(`data: ${JSON.stringify({ message })}\n\n`)
    }
}

function sendNotificationToAll(message) {
    notificationClients.forEach(client => {
        client.res.write(`data: ${JSON.stringify({ message })}\n\n`)
    })
}

module.exports = {
    notificationClients,
    notificationEventsHandler,
    sendNotificationToAll,
    sendNotificationToClient
}