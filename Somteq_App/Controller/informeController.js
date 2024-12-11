const db = require('../db'); // Conexión con la base de datos MySQL

const InformesController = {
  // Obtener todos los informes
  getAll: async (req, res) => {
    try {
      db.query('SELECT * FROM Informes', (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        res.json(result); // Devuelve todos los informes
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Obtener informe por ID
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      db.query('SELECT * FROM Informes WHERE Id = ?', [id], (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        if (result.length === 0) {
          return res.status(404).send('Informe not found');
        }
        res.json(result[0]); // Devuelve el informe encontrado por ID
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Crear nuevo informe
  create: async (req, res) => {
    const { usuarioId, equipoId, descripcion, fecha } = req.body;
    try {
      db.query(
        'INSERT INTO Informes (UsuarioId, EquipoId, Descripcion, Fecha) VALUES (?, ?, ?, ?)',
        [usuarioId, equipoId, descripcion, fecha],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(400).send('Bad request');
          }
          res.status(201).json({ message: 'Informe created', id: result.insertId });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Actualizar informe por ID
  update: async (req, res) => {
    const { id } = req.params;
    const { usuarioId, equipoId, descripcion, fecha } = req.body;

    try {
      db.query(
        'UPDATE Informes SET UsuarioId = ?, EquipoId = ?, Descripcion = ?, Fecha = ? WHERE Id = ?',
        [usuarioId, equipoId, descripcion, fecha, id],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
          }
          if (result.affectedRows === 0) {
            return res.status(404).send('Informe not found');
          }
          res.json({ message: 'Informe updated' });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Eliminar informe por ID
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      db.query('DELETE FROM Informes WHERE Id = ?', [id], (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        if (result.affectedRows === 0) {
          return res.status(404).send('Informe not found');
        }
        res.json({ message: 'Informe deleted' });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = InformesController;
