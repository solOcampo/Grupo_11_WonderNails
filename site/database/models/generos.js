'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Generos extends Model {

    static associate(models) {
       Generos.hasMany(models.Usuarios,{
        as: 'usuario',
        foreignKey: 'generoId'
      })
    }
  }
  Generos.init({
    rol: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Generos',
  });
  return Generos;
};