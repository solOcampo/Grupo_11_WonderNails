'use strict';

let listado = require('../../data/creditCards.json')

let tarjetas = listado.map(tarjeta =>{
  let elemento = {
    numero_de_tarjeta: tarjeta.numero_de_tarjeta,
    nombre_impreso: tarjeta.nombre_impreso,
    fecha_vencimiento: tarjeta.fecha_vencimiento,
    codigo_de_seguridad: tarjeta.codigo_de_seguridad,
    usuario_id: tarjeta.usuario_id,
    createdAt: new Date,
    updatedAt: new Date
  }
  return elemento
})

module.exports = {
  async up (queryInterface, Sequelize) {
 
     await queryInterface.bulkInsert('Tarjetas', tarjetas, {});
   
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Tarjetas', null, {});  
  }
};
