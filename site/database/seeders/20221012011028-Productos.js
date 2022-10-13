'use strict';
/** @type {import('sequelize-cli').Migration} */
let listado= require('../../data/productos.json')


let listadoCategorias=["Aparatos","Esmaltado Semipermanente","Contrucción de Uñas","Esmaltado","Decoración","Herramientas","Accesorios", "Aparatos","Cuidado de Manos y Pies","Maquillaje","Esmaltes"]
let marcas =["Thuya","Meliné","Anush","Collage","Exel","WPRO","Teknikpro","Wonder Nails","Mundial","Palladio", "Pinnacle","Nailway","TeknikStyle","Mohr Inc","Sally Hansen","Note","Pink Mask"]
let estado= ["Oferta", "Favoritos", "Nuevo" ]
let productos =[]

listado.forEach(producto=>{
    let categoria
    let marca
    let estados
    listadoCategorias.forEach((categoriaLista,index) => {
        if (categoriaLista==producto.categoria) {
            return categoria=index +1
        }
       
    });
    marcas.forEach((elemento,index) => {
        if (elemento == producto.marca) {
            return marca = index + 1
        }
       
    }),
    estado.forEach((estadoProducto,index) => {
        if (estadoProducto == producto.estados) {
            return estados = index + 1
        }
       
    });
    
   
    let nuevo={
        nombre:producto.nombre,
        stock:producto.stock,
        precio:producto.precio,
        descripcion:producto.descripcion,
        descuento:producto.descuento,
        categoriasid:categoria,
        marcasid:marca,
        estadosid:estados,
        createdAt:new Date,
        updatedAt:new Date
    }
   productos.push(nuevo)
})
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Productos', productos, {});
  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Productos', null, {});
  }
};