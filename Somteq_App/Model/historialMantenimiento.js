// models/historialMantenimiento.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Mantenimiento = require('./Mantenimiento.js'); 
const HistorialMantenimiento = require('./HistorialMantenimiento.');

const HistorialMantenimiento = sequelize.define('HistorialMantenimiento', {
  //Mantenimiento.hasMany(HistorialMantenimiento, { foreignKey: 'mantenimientoId' });
  //HistorialMantenimiento.belongsTo(Mantenimiento, { foreignKey: 'mantenimientoId' });
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mantenimientoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Mantenimiento,
      key: 'id',
    },
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  observaciones: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'historial_mantenimiento',
  timestamps: true,


});

module.exports = HistorialMantenimiento;

