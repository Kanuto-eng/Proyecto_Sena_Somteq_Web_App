const { Router } = require('express');
const HistorialMantenimientosController = require('../Controller/historialMantenimientosController');

const historialMantenimientosRouter = Router();

historialMantenimientosRouter.get('/', HistorialMantenimientosController.getAll); // Obtener todos los historiales
historialMantenimientosRouter.get('/:id', HistorialMantenimientosController.getById); // Obtener historial por ID
historialMantenimientosRouter.post('/', HistorialMantenimientosController.create); // Crear un nuevo historial
historialMantenimientosRouter.put('/:id', HistorialMantenimientosController.update); // Actualizar un historial por ID
historialMantenimientosRouter.delete('/:id', HistorialMantenimientosController.delete); // Eliminar historial por ID

module.exports = historialMantenimientosRouter;