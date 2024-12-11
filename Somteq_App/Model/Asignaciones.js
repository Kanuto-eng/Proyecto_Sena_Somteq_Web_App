// models/asignaciones.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection'); // Ajusta el path según tu configuración

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
  timestamps: false, // Cambia a `true` si deseas incluir `createdAt` y `updatedAt`
});

// Relación con el modelo `Equipos` (si existe)
Asignaciones.associate = (models) => {
  Asignaciones.belongsTo(models.Equipos, {
    foreignKey: 'equipoId',
    as: 'equipo', // Alias para la relación
  });
};

module.exports = Asignaciones;