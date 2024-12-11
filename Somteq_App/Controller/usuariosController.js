const bcrypt = require('bcrypt');
const db = require('../db'); // Conexión con la base de datos MySQL

const UsuariosController = {
  // Obtener todos los usuarios
  getAll: async (req, res) => {
    try {
      db.query('SELECT * FROM Usuarios', (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        res.json(result); // Devuelve todos los usuarios
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Obtener usuario por ID
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      db.query('SELECT * FROM Usuarios WHERE Id = ?', [id], (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        if (result.length === 0) {
          return res.status(404).send('Usuario not found');
        }
        res.json(result[0]); // Devuelve el usuario encontrado por ID
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Crear nuevo usuario
  create: async (req, res) => {
    const { nombre, email, contraseña, rol } = req.body;

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(contraseña, salt);

      db.query(
        'INSERT INTO Usuarios (Nombre, Email, Contraseña, Rol) VALUES (?, ?, ?, ?)',
        [nombre, email, hashedPassword, rol],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(400).send('Bad request');
          }
          res.status(201).json({ message: 'Usuario created', id: result.insertId });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Actualizar usuario por ID
  update: async (req, res) => {
    const { id } = req.params;
    const { nombre, email, contraseña, rol } = req.body;
    let updatedFields = [nombre, email, rol];

    // Si la contraseña es parte de la actualización, encriptarla
    if (contraseña) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(contraseña, salt);
      updatedFields = [nombre, email, hashedPassword, rol];
    }

    try {
      db.query(
        'UPDATE Usuarios SET Nombre = ?, Email = ?, Contraseña = ?, Rol = ? WHERE Id = ?',
        [...updatedFields, id],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
          }
          if (result.affectedRows === 0) {
            return res.status(404).send('Usuario not found');
          }
          res.json({ message: 'Usuario updated' });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Eliminar usuario por ID
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      db.query('DELETE FROM Usuarios WHERE Id = ?', [id], (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }
        if (result.affectedRows === 0) {
          return res.status(404).send('Usuario not found');
        }
        res.json({ message: 'Usuario deleted' });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = UsuariosController;
