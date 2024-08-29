let usersClients = []

function usersEventsHandler(req, res) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const clientId = Date.now();
    const newClient = {
        id: clientId,
        res
    }

    usersClients.push(newClient)
    newClient.res.write(`data: ${JSON.stringify({ message: 'first' })}\n\n`);

    req.on('close', () => {
        usersClients = usersClients.filter(client => client.id !== clientId);
    })
}

function sendUsersToAll(message) {
    usersClients.forEach(client => {
        client.res.write(`data: ${JSON.stringify({ message })}\n\n`);
    })
}

module.exports = {
    usersEventsHandler,
    sendUsersToAll
}