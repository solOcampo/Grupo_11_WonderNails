'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productos extends Model {

    static associate(models) {
      Productos.belongsTo(models.Categorias, {
        as: 'category',
        foreignKey: 'categoriasid'
      }),
        Productos.belongsTo(models.Marcas, {
          as: 'marca',
          foreignKey: 'marcasid'
        }),
        Productos.belongsTo(models.Estados, {
          as: 'estado',
          foreignKey: 'estadosid'
        }),
        Productos.hasMany(models.Imagenes,{
          as:'imagenes',
          foreignKey:'idProductos'
      })
    }
  }
  Productos.init({
    nombre: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    precio: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    color: DataTypes.STRING,
    descuento: DataTypes.INTEGER,
    categoriasid: DataTypes.INTEGER,
    marcasid: DataTypes.INTEGER,
    estadosid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Productos',
  });
  return Productos;
};