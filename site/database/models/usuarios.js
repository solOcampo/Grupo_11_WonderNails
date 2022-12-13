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
      }),
      Usuarios.hasMany(models.Direcciones,{
        as: 'direccion',
        foreignKey: 'Usuarios_id'
      }),
      Usuarios.hasMany(models.Carritos,{
        as: 'carrito',
        foreignKey: 'Usuarios_id'
      })
    }
  }
  Usuarios.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    telefono: DataTypes.BIGINT,
    generoId: DataTypes.INTEGER,
    dni: DataTypes.BIGINT,
    rolId: DataTypes.INTEGER,
    imagen_perfil: DataTypes.STRING,
    imagen_portada: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};
