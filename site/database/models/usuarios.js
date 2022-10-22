'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {

    static associate(models) {
      Usuarios.belongsTo(models.Generos,{
        as: 'generos',
        foreignKey: 'generoId'
      }),
      Usuarios.belongsTo(models.Roles,{
        as: 'rol',
        foreignKey: 'rolId'
      })
    }
  }
  Usuarios.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    telefono: DataTypes.BIGINT,
    generoId: DataTypes.INTEGER,
    dni: DataTypes.BIGINT,
    rolId: DataTypes.INTEGER,
    imagenPerfil: DataTypes.STRING,
    imagenPortada: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};
