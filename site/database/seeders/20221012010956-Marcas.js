'use strict';

/** @type {import('sequelize-cli').Migration} */
let listado=["Thuya","Meliné","Anush","Collage","Exel","WPRO","Teknikpro","Wonder Nails","Mundial","Palladio", "Pinnacle","Nailway","TeknikStyle","Mohr Inc","Sally Hansen","Note","Pink Mask"]
let marcas=listado.map(marca=>{
let elemento ={
    nombre:marca,
    createdAt:new Date,
    updatedAt:new Date
  }
  return elemento
})
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Marcas', marcas, {});
  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Marcas', null, {});
  }
};
