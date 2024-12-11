// models/galeria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Galeria = sequelize.define('Galeria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  imagenURL: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fechaSubida: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Fecha actual por defecto
  },
}, {
  tableName: 'galeria',
  timestamps: true,
});

module.exports = Galeria;
