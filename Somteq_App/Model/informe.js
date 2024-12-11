// models/informe.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection'); // Ajusta el path según tu configuración
const Usuario = require('./Usuario'); // Ajusta según tu configuración
const Equipo = require('./Equipo'); // Ajusta según tu configuración

const Informe = sequelize.define('Informe', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id', // Asegúrate de que el modelo `Usuario` tenga un campo `id`
    },
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  detalles: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tipo: {
    type: DataTypes.STRING,
    defaultValue: 'General',
  },
  equipoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Equipo,
      key: 'id', // Asegúrate de que el modelo `Equipo` tenga un campo `id`
    },
  },
}, {
  tableName: 'informes',
  timestamps: false, // Cambia a `true` si deseas incluir `createdAt` y `updatedAt`
});

module.exports = Informe;
