'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portada_imagenes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Portada_imagenes.init({
    imagen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Portada_imagenes',
  });
  return Portada_imagenes;
};