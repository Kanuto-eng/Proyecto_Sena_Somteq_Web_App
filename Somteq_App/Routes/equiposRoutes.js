const { Router } = require('express');
const EquiposController = require('../Controller/equiposController');

const equiposRouter = Router();

equiposRouter.get('/', EquiposController.getAll); // Obtener todos los equipos
equiposRouter.get('/:id', EquiposController.getById); // Obtener equipo por ID
equiposRouter.put('/:id', EquiposController.updateById); // Actualizar equipo por ID
equiposRouter.post('/', EquiposController.create); // Crear un nuevo equipo
equiposRouter.delete('/:id', EquiposController.deleteById); // Eliminar equipo por ID

module.exports = equiposRouter;