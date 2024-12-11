// models/galeria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection'); // Ajusta el path según tu configuración

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
  timestamps: false, // Cambia a `true` si deseas incluir `createdAt` y `updatedAt`
});

module.exports = Galeria;
