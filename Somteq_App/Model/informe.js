// models/informe.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Usuario = require('./Usuario');
const Equipo = require('./Equipo');

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
      key: 'id',
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
      key: 'id',
    },
  },
}, {
  tableName: 'informes',
  timestamps: true,
});

module.exports = Informe;
