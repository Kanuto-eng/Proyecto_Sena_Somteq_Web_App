const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

// Importar las rutas
const asignacionesRouter = require('./Routes/asignacionesRoutes');
const equipoClinicaRouter = require('./Routes/equipoClinicaRoutes');
const equiposRouter = require('./Routes/equiposRoutes');
const galeriaRouter = require('./Routes/galeriaRoutes');
const historialMantenimientoRouter = require('./Routes/historialMantenimientoRoutes');
const clinicaRouter = require('./Routes/clinicaRoutes');
const informesRouter = require('./Routes/informesRoutes');
const mantenimientosRouter = require('./Routes/mantenimientosRoutes');
const piezasRouter = require('./Routes/piezasRoutes');
const usuariosRouter = require('./Routes/usuariosRoutes');

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(express.json()); // analizar solicitudes JSON
app.use(cors());

// Configurar la conexión con MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // usuario de MySQL
  password: '', // contraseña de MySQL
  database: 'somteqdb', // Nombre de la base de datos
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

// Rutas
app.use('/api/asignaciones', asignacionesRouter(db));
app.use('/api/equipoClinica', equipoClinicaRouter(db));
app.use('/api/equipos', equiposRouter(db));
app.use('/api/galeria', galeriaRouter(db));
app.use('/api/historialMantenimiento', historialMantenimientoRouter(db));
app.use('/api/clinica', clinicaRouter(db));
app.use('/api/informes', informesRouter(db));
app.use('/api/mantenimiento', mantenimientosRouter(db));
app.use('/api/pieza', piezasRouter(db));
app.use('/api/usuario', usuariosRouter(db));

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('API is running');
});

// Establecer el puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const sequelize = require('./database/connection');
const defineAssociations = require('./associations');

// Definir asociaciones
defineAssociations();

// Sincronizar las tablas con la base de datos
sequelize.sync({ force: true }) // Cambia 'false' a 'true' para que las tablas se eliminen y creen nuevamente
  .then(() => console.log('Database synced'))
  .catch((err) => console.log('Error syncing database: ', err));
