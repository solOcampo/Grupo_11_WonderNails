'use strict';
let listado = ["Masculino", "Femenino", "Prefiero no decirlo"]
let generos = listado.map(nombre => {
  let elemento = {
    genero:nombre,
    createdAt: new Date,
    updatedAt: new Date
  }
  return elemento
})

module.exports = {
  async up (queryInterface, Sequelize) {
 
     await queryInterface.bulkInsert('Generos', generos, {});
   
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Generos', null, {});  
  }
};
