const db = require('../db'); // Conexión con la base de datos MySQL

const EquiposController = {
  // Obtener todos los equipos
  getAll: async (req, res) => {
    try {
      db.query(
        'SELECT Equipos.*, Clinicas.Nombre AS ClinicaNombre, Piezas.Nombre AS PiezaNombre ' +
        'FROM Equipos ' +
        'LEFT JOIN Clinicas ON Equipos.ClinicaId = Clinicas.Id ' +
        'LEFT JOIN Piezas ON Equipos.PiezaId = Piezas.Id',
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
          }
          res.json(result); // Devuelve todos los equipos con sus clínicas y piezas
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Obtener equipo por ID
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      db.query(
        'SELECT Equipos.*, Clinicas.Nombre AS ClinicaNombre, Piezas.Nombre AS PiezaNombre ' +
        'FROM Equipos ' +
        'LEFT JOIN Clinicas ON Equipos.ClinicaId = Clinicas.Id ' +
        'LEFT JOIN Piezas ON Equipos.PiezaId = Piezas.Id ' +
        'WHERE Equipos.Id = ?',
        [id],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
          }
          if (result.length === 0) {
            return res.status(404).send('Equipo not found');
          }
          res.json(result[0]);
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Actualizar equipo por ID
  updateById: async (req, res) => {
    const { id } = req.params;
    const newEquipoData = req.body;

    try {
      db.query(
        'UPDATE Equipos SET ? WHERE Id = ?',
        [newEquipoData, id],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
          }
          if (result.affectedRows === 0) {
            return res.status(404).send('Equipo not found');
          }
          res.json({ message: 'Equipo updated' });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Crear nuevo equipo
  create: async (req, res) => {
    const { nombre, clinicaId, piezaId, descripcion, fechaAdquisicion, imagen, ultimaEsterilizacion, ordenCompra } = req.body;

    try {
      db.query(
        'INSERT INTO Equipos (Nombre, ClinicaId, PiezaId, Descripcion, FechaAdquisicion, Imagen, UltimaEsterilizacion, OrdenCompra) ' +
        'VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, clinicaId, piezaId, descripcion, fechaAdquisicion, imagen, ultimaEsterilizacion, ordenCompra],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(400).send('Bad request');
          }
          res.status(201).json({ message: 'Equipo created', id: result.insertId });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Eliminar equipo por ID
  deleteById: async (req, res) => {
    const { id } = req.params;
    try {
      db.query(
        'DELETE FROM Equipos WHERE Id = ?',
        [id],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
          }
          if (result.affectedRows === 0) {
            return res.status(404).send('Equipo not found');
          }
          res.json({ message: 'Equipo deleted' });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = EquiposController;
