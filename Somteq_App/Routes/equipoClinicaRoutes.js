const { Router } = require('express');
const EquipoClinicaController = require('../Controller/equipoClinicaController');

const equipoClinicaRouter = Router();

equipoClinicaRouter.get('/', EquipoClinicaController.getAll); // Obtener todas las equipoClinicas
equipoClinicaRouter.get('/:id', EquipoClinicaController.getById); // Obtener equipoClinica por ID
equipoClinicaRouter.post('/', EquipoClinicaController.create); // Crear un nuevo equipoClinica
equipoClinicaRouter.delete('/:id', EquipoClinicaController.deleteById); // Eliminar equipoClinica por ID

module.exports = equipoClinicaRouter;