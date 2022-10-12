'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ordenes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ordenes.init({
    Fecha_compra: DataTypes.DATE,
    Carritos_id: DataTypes.INTEGER,
    Usuarios_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ordenes',
  });
  return Ordenes;
};