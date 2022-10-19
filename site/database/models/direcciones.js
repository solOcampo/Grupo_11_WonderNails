'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Direcciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Direcciones.init({
    calle: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    barrio: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    provincia: DataTypes.STRING,
    codigoPostal: DataTypes.INTEGER,
    Usuario_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Direcciones',
  });
  return Direcciones;
};