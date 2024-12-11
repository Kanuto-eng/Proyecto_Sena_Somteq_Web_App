const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

// Importar las rutas
const asignacionesRouter = require('./routes/asignacionesRoutes');
const equipoClinicaRouter = require('./routes/equipoClinicaRoutes');
const equiposRouter = require('./routes/equiposRoutes');
const galeriaRouter = require('./routes/galeriaRoutes');
const historialMantenimientoRouter = require('./routes/historialMantenimientoRoutes');
const clinicaRouter = require('./routes/clinicaRoutes');
const informesRouter = require('./routes/informesRoutes');
const mantenimientoRouter = require('./routes/mantenimientosRoutes');
const piezaRouter = require('./routes/piezasRoutes');
const usuarioRouter = require('./routes/usuariosRoutes');

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(express.json()); // Para analizar solicitudes JSON
app.use(cors()); 

// Configurar la conexión con MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: ' ', 
  database: 'somteqdb', 
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
app.use('/api/mantenimiento', mantenimientoRouter(db));
app.use('/api/pieza', piezaRouter(db));
app.use('/api/usuarios', usuarioRouter(db));

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('API is running');
});

// Establecer el puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

