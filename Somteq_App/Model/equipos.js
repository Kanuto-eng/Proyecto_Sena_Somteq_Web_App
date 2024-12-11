// models/equipos.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection'); // Ajusta el path según tu configuración

const Equipos = sequelize.define('Equipos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numeroSerie: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'Activo',
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fechaAdquisicion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  imagen: {
    type: DataTypes.BLOB('long'), // Para almacenar imágenes
    allowNull: true,
  },
  ultimaEsterilizacion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  ordenCompra: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'equipos',
  timestamps: false, // Cambia a `true` si deseas incluir `createdAt` y `updatedAt`
});

// Relación con modelos asociados
Equipos.associate = (models) => {
  Equipos.belongsTo(models.Clinica, {
    foreignKey: 'clinicaId',
    as: 'clinica',
  });

  Equipos.belongsTo(models.Piezas, {
    foreignKey: 'piezaId',
    as: 'pieza',
  });

  Equipos.hasMany(models.Mantenimientos, {
    foreignKey: 'equipoId',
    as: 'mantenimientos',
  });

  Equipos.hasMany(models.EquipoClinica, {
    foreignKey: 'equipoId',
    as: 'equipoClinicas',
  });
};

module.exports = Equipos;
