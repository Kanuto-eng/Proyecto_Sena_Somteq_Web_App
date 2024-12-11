const { Router } = require('express');
const PiezasController = require('../Controller/piezasController');

const piezasRouter = Router();

piezasRouter.get('/', PiezasController.getAll); // Obtener todas las piezas
piezasRouter.get('/:id', PiezasController.getById); // Obtener pieza por ID
piezasRouter.post('/', PiezasController.create); // Crear nueva pieza
piezasRouter.put('/:id', PiezasController.update); // Actualizar pieza por ID
piezasRouter.delete('/:id', PiezasController.delete); // Eliminar pieza por ID

module.exports = piezasRouter;
