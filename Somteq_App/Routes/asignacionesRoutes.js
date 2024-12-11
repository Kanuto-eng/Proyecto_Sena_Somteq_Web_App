const { Router } = require('express');
const asignacionesController = require('../Controller/asignacionesController');

const router = Router();

router.get('/', asignacionesController.getAll); // Obtener todas las asignaciones
router.get('/:id', asignacionesController.getById); // Obtener asignación por ID
router.post('/', asignacionesController.create); // Crear nueva asignación
router.delete('/:id', asignacionesController.deleteById); // Eliminar asignación por ID

module.exports = router;