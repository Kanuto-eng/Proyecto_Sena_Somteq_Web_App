const db = require('../db'); // Conexión con la base de datos MySQL

const HistorialMantenimientosController = {
  // Obtener todos los historiales de mantenimiento
  getAll: async (req, res) => {
    try {
      db.query('SELECT * FROM HistorialMantenimientos', (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        res.json(result); // Devuelve todos los historiales
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Obtener historial de mantenimiento por ID
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      db.query('SELECT * FROM HistorialMantenimientos WHERE Id = ?', [id], (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        if (result.length === 0) {
          return res.status(404).send('HistorialMantenimiento not found');
        }
        res.json(result[0]); // Devuelve el historial encontrado por ID
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Crear nuevo historial de mantenimiento
  create: async (req, res) => {
    const { mantenimientoId, fecha, observaciones } = req.body;
    try {
      db.query(
        'INSERT INTO HistorialMantenimientos (MantenimientoId, Fecha, Observaciones) VALUES (?, ?, ?)',
        [mantenimientoId, fecha, observaciones],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(400).send('Bad request');
          }
          res.status(201).json({ message: 'HistorialMantenimiento created', id: result.insertId });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Actualizar historial de mantenimiento por ID
  update: async (req, res) => {
    const { id } = req.params;
    const { mantenimientoId, fecha, observaciones } = req.body;

    try {
      db.query(
        'UPDATE HistorialMantenimientos SET MantenimientoId = ?, Fecha = ?, Observaciones = ? WHERE Id = ?',
        [mantenimientoId, fecha, observaciones, id],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
          }
          if (result.affectedRows === 0) {
            return res.status(404).send('HistorialMantenimiento not found');
          }
          res.json({ message: 'HistorialMantenimiento updated' });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Eliminar historial de mantenimiento por ID
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      db.query('DELETE FROM HistorialMantenimientos WHERE Id = ?', [id], (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        if (result.affectedRows === 0) {
          return res.status(404).send('HistorialMantenimiento not found');
        }
        res.json({ message: 'HistorialMantenimiento deleted' });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = HistorialMantenimientosController;
