// models/mantenimientos.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection'); // Ajusta el path según tu configuración
const Equipo = require('./Equipo'); // Asegúrate de tener el modelo `Equipo`
const HistorialMantenimiento = require('./HistorialMantenimiento,js'); // Ajusta según tu configuración

const Mantenimientos = sequelize.define('Mantenimientos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  equipoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Equipo,
      key: 'id', // Asegúrate de que el modelo `Equipo` tenga un campo `id`
    },
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    defaultValue: 'Preventivo',
  },
  fotografia: {
    type: DataTypes.BLOB('long'), // Para almacenar datos de imagen
    allowNull: true,
  },
}, {
  tableName: 'mantenimientos',
  timestamps: false, // Cambia a `true` si deseas incluir `createdAt` y `updatedAt`
});

module.exports = Mantenimientos;
