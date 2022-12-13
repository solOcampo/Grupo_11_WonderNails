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
      Ordenes.belongsTo(models.Usuarios,{
        as:'usuario',
        foreignKey:'Usuarios_id'
    })
      Ordenes.hasMany(models.Carritos,{
        as:'carrito',
        foreignKey:'Ordenes_id'
    })    }
  }
  Ordenes.init({
    Fecha_compra: DataTypes.DATE,
    status: DataTypes.STRING,
    Usuarios_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ordenes',
  });
  return Ordenes;
};