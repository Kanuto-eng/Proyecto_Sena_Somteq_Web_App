// models/piezas.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection'); // Ajusta el path según tu configuración
const Clinica = require('./Clinica'); // Asegúrate de tener el modelo `Clinica`

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
  timestamps: false, // Cambia a `true` si deseas incluir `createdAt` y `updatedAt`
});

Piezas.belongsTo(Clinica, { foreignKey: 'clinicaId' }); // Relación con el modelo Clinica

module.exports = Piezas;
