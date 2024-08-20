const express = require('express');
require('dotenv').config();

const notificationEventsRoutes = require('./routes/sse/notificationsEventsRoute');
const usersEventsRoutes = require('./routes/sse/usersEventsRoutes');
const loansEventsRoutes = require('./routes/sse/loansEventRouter');

const paymentRoutes = require('./routes/payment/paymentRoutes');

const activitiesRoutes = require('./routes/activitiesRoutes');
const usersRoutes = require('./routes/usersRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const loansRoutes = require('./routes/loansRoutes');
const notificationsRoutes = require('./routes/notificationsRoutes');
const adminRoutes = require('./routes/adminRoutes');
const renewRoutes = require('./routes/renewRoutes');

const errorHandler = require('./middleware/errorHandler');


const { setup } = require('./utils/serverSetup')

const path = require('path');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(cors({
  origin: process.env.URL
}));

app.use('/server/payment', express.raw({ type: 'application/json' }), paymentRoutes);

app.use(express.json());

app.use('/notifications', notificationEventsRoutes);
app.use('/users', usersEventsRoutes);
app.use('/loans', loansEventsRoutes);

app.use('/server/activities', activitiesRoutes);
app.use('/server/users', usersRoutes);
app.use('/server/equipment', equipmentRoutes);
app.use('/server/loans', loansRoutes);
app.use('/server/notifications', notificationsRoutes);
app.use('/server/admin', adminRoutes);
app.use('/server/renew', renewRoutes);

setup()
// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../client/dist')));

// Ruta para el frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
