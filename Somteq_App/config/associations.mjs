const { Clinicas, Usuarios, Equipos, Piezas, Mantenimientos, HistorialMantenimientos, Informes, Ayuda, Galeria, EquipoClinica, Asignaciones } = require('./models');

const defineAssociations = () => {
  // Relación entre Clinicas y Equipos (1:N)
  // Una clínica puede tener muchos equipos
  Clinicas.hasMany(Equipos, { foreignKey: 'ClinicaId' });
  Equipos.belongsTo(Clinicas, { foreignKey: 'ClinicaId' });

  // Relación entre Equipos y Piezas (1:N)
  // Un equipo puede tener muchas piezas
  Equipos.hasMany(Piezas, { foreignKey: 'PiezaId' });
  Piezas.belongsTo(Equipos, { foreignKey: 'PiezaId' });

  // Relación entre Equipos y Mantenimientos (1:N)
  // Un equipo puede tener muchos mantenimientos
  Equipos.hasMany(Mantenimientos, { foreignKey: 'EquipoId' });
  Mantenimientos.belongsTo(Equipos, { foreignKey: 'EquipoId' });

  // Relación entre Mantenimientos y HistorialMantenimientos (1:N)
  // Un mantenimiento puede tener varios registros en el historial
  Mantenimientos.hasMany(HistorialMantenimientos, { foreignKey: 'MantenimientoId' });
  HistorialMantenimientos.belongsTo(Mantenimientos, { foreignKey: 'MantenimientoId' });

  // Relación entre Usuarios y Informes (1:N)
  // Un usuario puede crear muchos informes
  Usuarios.hasMany(Informes, { foreignKey: 'UsuarioId' });
  Informes.belongsTo(Usuarios, { foreignKey: 'UsuarioId' });

  // Relación entre Equipos y Informes (1:N)
  // Un equipo puede estar en muchos informes
  Equipos.hasMany(Informes, { foreignKey: 'EquipoId' });
  Informes.belongsTo(Equipos, { foreignKey: 'EquipoId' });

  // Relación entre Usuarios y Ayuda (1:N)
  // Un usuario puede crear muchos mensajes de ayuda
  Usuarios.hasMany(Ayuda, { foreignKey: 'UsuarioId' });
  Ayuda.belongsTo(Usuarios, { foreignKey: 'UsuarioId' });

  // Relación entre Equipos y Galeria (1:N)
  // Un equipo puede tener muchas imágenes en la galería
  Equipos.hasMany(Galeria, { foreignKey: 'EquipoId' });
  Galeria.belongsTo(Equipos, { foreignKey: 'EquipoId' });

  // Relación entre Equipos y Clínicas a través de la tabla intermedia 'EquipoClinica' (M:N)
  // Un equipo puede estar en varias clínicas, y una clínica puede tener muchos equipos
  Equipos.belongsToMany(Clinicas, { through: EquipoClinica, foreignKey: 'EquipoId' });
  Clinicas.belongsToMany(Equipos, { through: EquipoClinica, foreignKey: 'ClinicaId' });

  // Relación entre Equipos y Asignaciones (1:N)
  // Un equipo puede tener muchas asignaciones
  Equipos.hasMany(Asignaciones, { foreignKey: 'EquipoId' });
  Asignaciones.belongsTo(Equipos, { foreignKey: 'EquipoId' });
};

module.exports = defineAssociations;
