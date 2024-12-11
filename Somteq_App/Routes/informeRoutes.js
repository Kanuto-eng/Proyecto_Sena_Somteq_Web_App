const { Router } = require('express');
const InformesController = require('../Controller/informeController');

const informesRouter = Router();

informesRouter.get('/', InformesController.getAll); // Obtener todos los informes
informesRouter.get('/:id', InformesController.getById); // Obtener informe por ID
informesRouter.post('/', InformesController.create); // Crear nuevo informe
informesRouter.put('/:id', InformesController.update); // Actualizar informe por ID
informesRouter.delete('/:id', InformesController.delete); // Eliminar informe por ID

module.exports = informesRouter;