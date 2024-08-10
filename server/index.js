const express = require('express');

const activitiesRoutes = require('./routes/activitiesRoutes');
const usersRoutes = require('./routes/usersRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const loansRoutes = require('./routes/loansRoutes');
const notificationsRoutes = require('./routes/notificationsRoutes')

const errorHandler = require('./middleware/errorHandler');


const path = require('path');
const app = express();
const port = 5000;

// Middleware para parsear JSON
app.use(express.json());

app.use('/server/activities', activitiesRoutes);
app.use('/server/users', usersRoutes);
app.use('/server/equipment', equipmentRoutes);
app.use('/server/loans', loansRoutes);
app.use('/server/notifications', notificationsRoutes);



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
