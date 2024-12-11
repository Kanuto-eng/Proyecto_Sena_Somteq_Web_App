const db = require('../db'); // Conexión con la base de datos MySQL

const PiezasController = {
  // Obtener todas las piezas
  getAll: async (req, res) => {
    try {
      db.query('SELECT * FROM Piezas', (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        res.json(result); // Devuelve todas las piezas
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Obtener pieza por ID
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      db.query('SELECT * FROM Piezas WHERE Id = ?', [id], (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        if (result.length === 0) {
          return res.status(404).send('Pieza not found');
        }
        res.json(result[0]); // Devuelve la pieza encontrada por ID
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Crear nueva pieza
  create: async (req, res) => {
    const { clinicaId, nombre, descripcion, cantidad } = req.body;
    try {
      db.query(
        'INSERT INTO Piezas (ClinicaId, Nombre, Descripcion, Cantidad) VALUES (?, ?, ?, ?)',
        [clinicaId, nombre, descripcion, cantidad],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(400).send('Bad request');
          }
          res.status(201).json({ message: 'Pieza created', id: result.insertId });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Actualizar pieza por ID
  update: async (req, res) => {
    const { id } = req.params;
    const { clinicaId, nombre, descripcion, cantidad } = req.body;

    try {
      db.query(
        'UPDATE Piezas SET ClinicaId = ?, Nombre = ?, Descripcion = ?, Cantidad = ? WHERE Id = ?',
        [clinicaId, nombre, descripcion, cantidad, id],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
          }
          if (result.affectedRows === 0) {
            return res.status(404).send('Pieza not found');
          }
          res.json({ message: 'Pieza updated' });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Eliminar pieza por ID
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      db.query('DELETE FROM Piezas WHERE Id = ?', [id], (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        if (result.affectedRows === 0) {
          return res.status(404).send('Pieza not found');
        }
        res.json({ message: 'Pieza deleted' });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = PiezasController;
