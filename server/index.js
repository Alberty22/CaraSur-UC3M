const express = require('express');

const activitiesRoutes = require('./routes/activitiesRoutes');
const errorHandler = require('./middleware/errorHandler');


const path = require('path');
const app = express();
const port = 5000;



app.use('/server/activities', activitiesRoutes);



// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../client/dist')));

// Ruta para el frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
