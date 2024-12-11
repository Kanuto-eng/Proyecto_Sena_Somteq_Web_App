const { Router } = require('express');
const clinicaController = require('../Controller/clinicacontroller');

const router = Router();

router.get('/', clinicaController.getAll); // Obtener todas las clínicas
router.get('/:id', clinicaController.getById); // Obtener clínica por ID
router.put('/:id', clinicaController.updateById); // Actualizar clínica por ID
router.post('/', clinicaController.create); // Crear nueva clínica
router.delete('/:id', clinicaController.deleteById); // Eliminar clínica por ID

module.exports = router;