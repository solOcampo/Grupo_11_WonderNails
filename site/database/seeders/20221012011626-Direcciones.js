'use strict';
let listado = require('../../data/users.json')

let direcciones = listado.map(direccion => {
  let elemento = {
    calle:direccion.calle,
    numero:direccion.numero,
    barrio:direccion.barrio,
    ciudad:direccion.ciudad,
    provincia:direccion.provincia,
    codigoPostal:direccion.codigoPostal,
    createdAt: new Date,
    updatedAt: new Date
  }
  return elemento
})

module.exports = {
  async up (queryInterface, Sequelize) {
 
     await queryInterface.bulkInsert('Direcciones', direcciones, {});
   
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Direcciones', null, {});  
  }
};
