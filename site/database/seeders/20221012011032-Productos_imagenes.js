'use strict';
let listado = require('../../data/productos.json')
let imagenes = []

listado.forEach(producto => {
  let imagen = {
    nombre: producto.imagen[0],
    idproductos: producto.id,
    createdAt:new Date,
    updatedAt:new Date
  }
  let imagen2 = {
    nombre: producto.imagen[1],
    idproductos: producto.id,
    createdAt:new Date,
    updatedAt:new Date
  }
  let imagen3 = {
    nombre: producto.imagen[2],
    idproductos: producto.id,
    createdAt:new Date,
    updatedAt:new Date
  }
  let imagen4 = {
    nombre: producto.imagen[3],
    idproductos: producto.id,
    createdAt:new Date,
    updatedAt:new Date
  }
  imagenes.push(imagen,imagen2,imagen3,imagen4)
})

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Productos_Imagenes', imagenes, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Productos_Imagenes', null, {});
  }
};