'use strict';

/** @type {import('sequelize-cli').Migration} */
let listado=["Aparatos","Esmaltado Semipermanente","Contrucción de Uñas","Esmaltado","Decoración","Herramientas","Accesorios", "Aparatos","Cuidado de Manos y Pies","Maquillaje","Esmaltes"]

let categorias=listado.map(categoria=>{
let elemento ={
    nombre:categoria,
    createdAt:new Date,
    updatedAt:new Date
  }
  return elemento
})

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Categorias', categorias, {});
  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Categorias', null, {});
  }
};