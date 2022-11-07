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
      Productos_imagenes.belongsTo(models.Productos,{
        as:'productos',
        foreignKey:'idProducts'
    })
    }
  }
  Productos_imagenes.init({
    nombre: DataTypes.STRING,
    idProductos: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Productos_imagenes',
  });
  return Productos_imagenes;
};