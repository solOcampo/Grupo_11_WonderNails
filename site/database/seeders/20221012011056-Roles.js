'use strict';
let listado = ["Administrador", "Usuario"]
let roles = listado.map(nombre => {
  let elemento = {
    rol:nombre,
    createdAt: new Date,
    updatedAt: new Date
  }
  return elemento
})

module.exports = {
  async up (queryInterface, Sequelize) {
 
     await queryInterface.bulkInsert('Roles', roles, {});
   
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Roles', null, {});  
  }
};
