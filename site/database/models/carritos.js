'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carritos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Carritos.init({
    Total_compra: DataTypes.BIGINT,
    Total_items: DataTypes.INTEGER,
    Productos_id: DataTypes.INTEGER,
    Usuarios_id: DataTypes.INTEGER,
    Tipo_envio_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Carritos',
  });
  return Carritos;
};