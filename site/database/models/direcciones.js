'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Direcciones extends Model {

      static associate(models) {
         Direcciones.belongsTo(models.Usuarios,{
          as: 'usuario',
          foreignKey: 'Usuarios_id'
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
    Usuarios_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Direcciones',
  });
  return Direcciones;
};