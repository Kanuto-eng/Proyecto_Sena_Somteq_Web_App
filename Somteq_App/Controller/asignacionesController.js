const db = require('../db'); // Requiere la conexión con la base de datos

const asignacionesController = {
  // Obtener todas las asignaciones
  getAll: async (req, res) => {
    try {
      db.query('SELECT * FROM Asignaciones', (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        res.json(result); // Devuelve las asignaciones
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Obtener asignación por ID
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      db.query('SELECT * FROM Asignaciones WHERE Id = ?', [id], (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        if (result.length === 0) {
          return res.status(404).send('Asignación no encontrada');
        }
        res.json(result[0]); // Devuelve la asignación encontrada
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Crear nueva asignación
  create: async (req, res) => {
    const { equipoId, clinica, fechaAsignacion } = req.body;
    try {
      db.query(
        'INSERT INTO Asignaciones (EquipoId, Clinica, FechaAsignacion) VALUES (?, ?, ?)',
        [equipoId, clinica, fechaAsignacion],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(400).send('Bad request');
          }
          res.status(201).json({ message: 'Asignación creada', id: result.insertId });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Eliminar asignación por ID
  deleteById: async (req, res) => {
    const { id } = req.params;
    try {
      db.query('DELETE FROM Asignaciones WHERE Id = ?', [id], (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        if (result.affectedRows === 0) {
          return res.status(404).send('Asignación no encontrada');
        }
        res.json({ message: 'Asignación eliminada' });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = asignacionesController;
