'use strict';
let listado = ["Envío a domicilio", "Envío a sucursal Correo Argentino", "Retiro a Alto Avellaneda Shopping (CABA)", "Retiro a Alto Palermo Shopping(CABA)", "Retiro a Alto Comahue Shopping(Neuquén)", "Retiro a El Mercado(Villa la Angostura)"]

let envios = listado.map(nombre => {
  let elemento = {
    tipo_envio:nombre,
    createdAt: new Date,
    updatedAt: new Date
  }
  return elemento
})

module.exports = {
  async up (queryInterface, Sequelize) {
 
     await queryInterface.bulkInsert('Envios', envios, {});
   
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Envios', null, {});  
  }
};
