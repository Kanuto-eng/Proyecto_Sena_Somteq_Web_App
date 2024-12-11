// models/asignaciones.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Asignaciones = sequelize.define('Asignaciones', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  equipoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clinica: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  fechaAsignacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'asignaciones',
  timestamps: true,
});

// Relación con el modelo `Equipos` 
Asignaciones.associate = (models) => {
  Asignaciones.belongsTo(models.Equipos, {
    foreignKey: 'equipoId',
    as: 'equipo', 
  });
};

module.exports = Asignaciones;