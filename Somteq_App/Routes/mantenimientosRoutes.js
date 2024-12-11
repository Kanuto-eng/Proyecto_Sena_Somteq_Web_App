const { Router } = require('express');
const MantenimientosController = require('../Controller/mantenimientosController');

const mantenimientosRouter = Router();

mantenimientosRouter.get('/', MantenimientosController.getAll); // Obtener todos los mantenimientos
mantenimientosRouter.get('/:id', MantenimientosController.getById); // Obtener mantenimiento por ID
mantenimientosRouter.post('/', MantenimientosController.create); // Crear nuevo mantenimiento
mantenimientosRouter.put('/:id', MantenimientosController.update); // Actualizar mantenimiento por ID
mantenimientosRouter.delete('/:id', MantenimientosController.delete); // Eliminar mantenimiento por ID

module.exports = mantenimientosRouter;
