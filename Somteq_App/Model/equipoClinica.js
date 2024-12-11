// models/equipoClinica.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const EquipoClinica = sequelize.define('EquipoClinica', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  equipoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clinicaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'equipo_clinica',
  timestamps: true,
});

// Relación con modelos asociados
EquipoClinica.associate = (models) => {
  EquipoClinica.belongsTo(models.Equipos, {
    foreignKey: 'equipoId',
    as: 'equipo',
  });

  EquipoClinica.belongsTo(models.Clinica, {
    foreignKey: 'clinicaId',
    as: 'clinica',
  });
};

module.exports = EquipoClinica;
