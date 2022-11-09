'use strict';

let listado= ["Oferta", "Favoritos", "Nuevo", "Sin estado" ]
let estados=listado.map(estado=>{
  let elemento ={
      estado:estado,
      createdAt:new Date,
      updatedAt:new Date
    }
    return elemento
  })

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Estados', estados, {});
  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Estados', null, {});
  }
};