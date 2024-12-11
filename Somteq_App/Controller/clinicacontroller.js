const db = require('../db'); // Conexión con la base de datos MySQL

const clinicaController = {
  // Obtener todas las clínicas
  getAll: async (req, res) => {
    try {
      db.query('SELECT * FROM Clinicas', (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        res.json(result); // Devuelve todas las clínicas
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Obtener clínica por ID
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      db.query('SELECT * FROM Clinicas WHERE Id = ?', [id], (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        if (result.length === 0) {
          return res.status(404).send('Clinica not found');
        }
        res.json(result[0]); // Devuelve la clínica encontrada
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Actualizar clínica por ID
  updateById: async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, telefono } = req.body;

    try {
      db.query(
        'UPDATE Clinicas SET Nombre = ?, Direccion = ?, Telefono = ? WHERE Id = ?',
        [nombre, direccion, telefono, id],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
          }
          if (result.affectedRows === 0) {
            return res.status(404).send('Clinica not found');
          }
          res.json({ message: 'Clinica updated' });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Crear nueva clínica
  create: async (req, res) => {
    const { nombre, direccion, telefono } = req.body;

    try {
      db.query(
        'INSERT INTO Clinicas (Nombre, Direccion, Telefono) VALUES (?, ?, ?)',
        [nombre, direccion, telefono],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(400).send('Bad request');
          }
          res.status(201).json({ message: 'Clinica created', id: result.insertId });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Eliminar clínica por ID
  deleteById: async (req, res) => {
    const { id } = req.params;
    try {
      db.query('DELETE FROM Clinicas WHERE Id = ?', [id], (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        if (result.affectedRows === 0) {
          return res.status(404).send('Clinica not found');
        }
        res.json({ message: 'Clinica deleted' });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = clinicaController;
