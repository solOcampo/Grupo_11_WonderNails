'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Imagenes extends Model {

    static associate(models) {
        Imagenes.belongsTo(models.Productos,{
          as:'productos',
          foreignKey:'idProductos'
      })
    }
  }
  Imagenes.init({
    nombre: DataTypes.STRING,
    idProductos: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Imagenes',
  });
  return Imagenes;
};