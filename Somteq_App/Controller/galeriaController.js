const db = require('../db'); // Conexión con la base de datos MySQL

const GaleriasController = {
  // Obtener todas las galerías
  getAll: async (req, res) => {
    try {
      db.query('SELECT * FROM Galeria', (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        res.json(result); // Devuelve todas las galerías
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Obtener galería por ID
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      db.query('SELECT * FROM Galeria WHERE Id = ?', [id], (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        if (result.length === 0) {
          return res.status(404).send('Galeria not found');
        }
        res.json(result[0]); // Devuelve la galería encontrada por ID
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Crear nueva galería
  create: async (req, res) => {
    const { imagenURL, descripcion } = req.body;
    try {
      db.query(
        'INSERT INTO Galeria (ImagenURL, Descripcion) VALUES (?, ?)',
        [imagenURL, descripcion],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(400).send('Bad request');
          }
          res.status(201).json({ message: 'Galeria created', id: result.insertId });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Eliminar galería por ID
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      db.query('DELETE FROM Galeria WHERE Id = ?', [id], (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        if (result.affectedRows === 0) {
          return res.status(404).send('Galeria not found');
        }
        res.json({ message: 'Galeria deleted' });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = GaleriasController;
