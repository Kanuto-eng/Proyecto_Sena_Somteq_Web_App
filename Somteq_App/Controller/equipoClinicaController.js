const db = require('../db'); // Conexión con la base de datos MySQL

const EquipoClinicaController = {
  // Obtener todas las relaciones entre equipos y clínicas
  getAll: async (req, res) => {
    try {
      db.query(
        'SELECT EquipoClinica.*, Equipos.Nombre AS EquipoNombre, Clinicas.Nombre AS ClinicaNombre FROM EquipoClinica ' +
        'JOIN Equipos ON EquipoClinica.EquipoId = Equipos.Id ' +
        'JOIN Clinicas ON EquipoClinica.ClinicaId = Clinicas.Id',
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
          }
          res.json(result); // Devuelve las relaciones entre equipos y clínicas
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Obtener relación por ID
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      db.query(
        'SELECT EquipoClinica.*, Equipos.Nombre AS EquipoNombre, Clinicas.Nombre AS ClinicaNombre ' +
        'FROM EquipoClinica ' +
        'JOIN Equipos ON EquipoClinica.EquipoId = Equipos.Id ' +
        'JOIN Clinicas ON EquipoClinica.ClinicaId = Clinicas.Id ' +
        'WHERE EquipoClinica.Id = ?',
        [id],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
          }
          if (result.length === 0) {
            return res.status(404).send('EquipoClinica not found');
          }
          res.json(result[0]); // Devuelve la relación encontrada
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Crear nueva relación entre equipo y clínica
  create: async (req, res) => {
    const { equipoId, clinicaId } = req.body; // Asumiendo que estos son los datos necesarios

    try {
      db.query(
        'INSERT INTO EquipoClinica (EquipoId, ClinicaId) VALUES (?, ?)',
        [equipoId, clinicaId],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(400).send('Bad request');
          }
          res.status(201).json({ message: 'EquipoClinica created', id: result.insertId });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Eliminar relación por ID
  deleteById: async (req, res) => {
    const { id } = req.params;
    try {
      db.query(
        'DELETE FROM EquipoClinica WHERE Id = ?',
        [id],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
          }
          if (result.affectedRows === 0) {
            return res.status(404).send('EquipoClinica not found');
          }
          res.json({ message: 'EquipoClinica deleted' });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = EquipoClinicaController;
