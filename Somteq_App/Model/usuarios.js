// models/usuarios.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection'); // Ajusta el path según tu configuración

const Usuarios = sequelize.define('Usuarios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Asegura que el correo sea único
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    defaultValue: 'Usuario',
  },
  fechaRegistro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'usuarios',
  timestamps: false, // Cambia a `true` si deseas incluir `createdAt` y `updatedAt`
});

// Hook para encriptar la contraseña antes de guardar el usuario
Usuarios.beforeCreate(async (user, options) => {
  if (user.contraseña) {
    const salt = await bcrypt.genSalt(10);
    user.contraseña = await bcrypt.hash(user.contraseña, salt);
  }
});

module.exports = Usuarios;
