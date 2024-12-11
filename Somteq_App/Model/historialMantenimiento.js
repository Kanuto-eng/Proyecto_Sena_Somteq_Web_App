// models/historialMantenimiento.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection'); // Ajusta el path según tu configuración
const Mantenimiento = require('./Mantenimiento.js'); // Ajusta según tu configuración de relaciones
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
      key: 'id', // Asegúrate de que `Mantenimiento` tenga un campo `id`
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
  timestamps: false, // Cambia a `true` si deseas incluir `createdAt` y `updatedAt`


});

module.exports = HistorialMantenimiento;

