const db = require('../db'); // Conexión con la base de datos MySQL

const MantenimientosController = {
  // Obtener todos los mantenimientos
  getAll: async (req, res) => {
    try {
      db.query('SELECT * FROM Mantenimientos', (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        res.json(result); // Devuelve todos los mantenimientos
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Obtener mantenimiento por ID
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      db.query('SELECT * FROM Mantenimientos WHERE Id = ?', [id], (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        if (result.length === 0) {
          return res.status(404).send('Mantenimiento not found');
        }
        res.json(result[0]); // Devuelve el mantenimiento encontrado por ID
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Crear nuevo mantenimiento
  create: async (req, res) => {
    const { equipoId, descripcion, fecha, tipoMantenimiento } = req.body;
    try {
      db.query(
        'INSERT INTO Mantenimientos (EquipoId, Descripcion, Fecha, TipoMantenimiento) VALUES (?, ?, ?, ?)',
        [equipoId, descripcion, fecha, tipoMantenimiento],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(400).send('Bad request');
          }
          res.status(201).json({ message: 'Mantenimiento created', id: result.insertId });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Actualizar mantenimiento por ID
  update: async (req, res) => {
    const { id } = req.params;
    const { equipoId, descripcion, fecha, tipoMantenimiento } = req.body;

    try {
      db.query(
        'UPDATE Mantenimientos SET EquipoId = ?, Descripcion = ?, Fecha = ?, TipoMantenimiento = ? WHERE Id = ?',
        [equipoId, descripcion, fecha, tipoMantenimiento, id],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
          }
          if (result.affectedRows === 0) {
            return res.status(404).send('Mantenimiento not found');
          }
          res.json({ message: 'Mantenimiento updated' });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Eliminar mantenimiento por ID
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      db.query('DELETE FROM Mantenimientos WHERE Id = ?', [id], (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        if (result.affectedRows === 0) {
          return res.status(404).send('Mantenimiento not found');
        }
        res.json({ message: 'Mantenimiento deleted' });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = MantenimientosController;
