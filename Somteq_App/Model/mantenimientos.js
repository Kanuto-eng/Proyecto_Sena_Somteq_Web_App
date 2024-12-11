// models/mantenimientos.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Equipo = require('./Equipo');
const HistorialMantenimiento = require('./HistorialMantenimiento,js');

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
      key: 'id',
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
  timestamps: true,
});

module.exports = Mantenimientos;
