let loansClients = []

function loansEventsHandler(req, res) {
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

    loansClients.push(newClient)
    newClient.res.write(`data: ${JSON.stringify({ message: 'first' })}\n\n`)

    req.on('close', () => {
        loansClients = loansClients.filter(client => client.id !== clientId);
    })
}

function sendLoansToClient(clientId, message) {
    const client = loansClients.find(client => client.id === clientId)
    if (client) {
        client.res.write(`data: ${JSON.stringify({ message })}\n\n`)
    }
}


module.exports = {
    loansClients,
    loansEventsHandler,
    sendLoansToClient
}