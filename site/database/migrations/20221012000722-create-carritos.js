'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carritos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Total_compra: {
        type: Sequelize.BIGINT
      },
      Total_items: {
        type: Sequelize.INTEGER
      },
      Productos_id: {
        type: Sequelize.INTEGER
      },
      Usuarios_id: {
        type: Sequelize.INTEGER
      },
      Tipo_envio_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carritos');
  }
};