// models/clinica.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection'); // Ajusta el path según tu configuración

const Clinica = sequelize.define('Clinica', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'clinicas',
  timestamps: false, // Cambia a `true` si deseas incluir `createdAt` y `updatedAt`
});

// Relación con modelos asociados
Clinica.associate = (models) => {
  Clinica.hasMany(models.Equipos, {
    foreignKey: 'clinicaId',
    as: 'equipos',
  });

  Clinica.hasMany(models.Piezas, {
    foreignKey: 'clinicaId',
    as: 'piezas',
  });

  Clinica.hasMany(models.EquipoClinica, {
    foreignKey: 'clinicaId',
    as: 'equipoClinicas',
  });
};

module.exports = Clinica;
