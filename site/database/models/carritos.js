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
      Carritos.belongsTo(models.Usuarios,{
        as:'usuario',
        foreignKey:'Usuarios_id'
    }),
    Carritos.belongsTo(models.Productos,{
      as:'producto',
      foreignKey:'Productos_id'
  }),
  Carritos.belongsTo(models.Ordenes,{
    as:'orden',
    foreignKey:'Ordenes_id'
})
  }
  }
  Carritos.init({
    Total_compra: DataTypes.BIGINT,
    Total_items: DataTypes.INTEGER,
    Productos_id: DataTypes.INTEGER,
    Usuarios_id: DataTypes.INTEGER,
    Tipo_envio_id: DataTypes.INTEGER,
    Ordenes_id:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Carritos',
  });
  return Carritos;
};