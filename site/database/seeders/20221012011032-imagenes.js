'use strict';
let listado = require('../../data/productos.json')
let imagenesJSON = []

listado.forEach(producto => {
  let id = producto.id
  producto.imagen.forEach(imagenes => {
      let imagen = {
          nombre: imagenes,
          idproductos: id,
          createdAt:new Date,
          updatedAt:new Date
      }
      imagenesJSON.push(imagen)
    });
})

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Imagenes', imagenesJSON, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Imagenes', null, {});
  }
};