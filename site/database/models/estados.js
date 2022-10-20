'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Estados.hasMany(models.Productos,{
        as:'productos',
        foreignKey:'estadosid'
    })
  
    }
  }
  Estados.init({
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Estados',
  });
  return Estados;
};