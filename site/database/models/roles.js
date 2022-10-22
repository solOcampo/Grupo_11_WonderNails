'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {

    static associate(models) {
        Roles.hasMany(models.Usuarios,{
         as: 'usuario',
         foreignKey: 'rolId'
       })
    }
  }
  Roles.init({
    rol: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};