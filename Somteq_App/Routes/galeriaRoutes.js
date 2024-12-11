const { Router } = require('express');
const GaleriasController = require('../Controller/galeriaController');

const galeriasRouter = Router();

galeriasRouter.get('/', GaleriasController.getAll); // Obtener todas las galerías
galeriasRouter.get('/:id', GaleriasController.getById); // Obtener galería por ID
galeriasRouter.post('/', GaleriasController.create); // Crear una nueva galería
galeriasRouter.delete('/:id', GaleriasController.delete); // Eliminar galería por ID

module.exports = galeriasRouter;