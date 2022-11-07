'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Direcciones extends Model {

      static associate(models) {
         Direcciones.hasMany(models.Usuarios,{
          as: 'usuario',
          foreignKey: 'direccionId'
        })
      }
  }
  Direcciones.init({
    calle: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    barrio: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    provincia: DataTypes.STRING,
    codigoPostal: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Direcciones',
  });
  return Direcciones;
};