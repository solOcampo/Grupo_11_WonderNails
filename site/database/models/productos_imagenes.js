'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productos_imagenes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Productos_imagenes.init({
    nombre: DataTypes.STRING,
    productosid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Productos_imagenes',
  });
  return Productos_imagenes;
};