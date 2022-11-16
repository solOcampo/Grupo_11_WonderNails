'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ordenes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Fecha_compra: {
        allowNull: false,
        type: Sequelize.DATE
      },
      Carritos_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:{
            tableName: 'Carritos'
          },
          key: 'id'
        }
      },
      Usuarios_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:{
            tableName: 'Usuarios'
          },
          key: 'id'
        }
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
    await queryInterface.dropTable('Ordenes');
  }
};