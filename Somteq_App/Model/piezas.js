// models/piezas.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Clinica = require('./Clinica');

const Piezas = sequelize.define('Piezas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imagen: {
    type: DataTypes.BLOB('long'), // Para almacenar imágenes como BLOB
    allowNull: true,
  },
  tipo: {
    type: DataTypes.STRING,
    defaultValue: 'Pieza',
  },
}, {
  tableName: 'piezas',
  timestamps: true,
});

Piezas.belongsTo(Clinica, { foreignKey: 'clinicaId' });

module.exports = Piezas;
