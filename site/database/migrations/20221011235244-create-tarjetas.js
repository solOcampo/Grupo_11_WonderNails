'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tarjetas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero_de_tarjeta: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nombre_impreso: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fecha_vencimiento: {
        allowNull: false,
        type: Sequelize.STRING
      },
      codigo_de_seguridad: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      usuario_id: {
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
    await queryInterface.dropTable('Tarjetas');
  }
};