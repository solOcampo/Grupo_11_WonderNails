'use strict';

let listado= require('../../data/productos.json');


let listadoCategorias=["Aparatos","Esmaltado Semipermanente","Contrucción de Uñas","Esmaltado","Decoración","Herramientas","Accesorios", "Aparatos","Cuidado de Manos y Pies","Maquillaje","Esmaltes"]
let marcas =["Thuya","Meliné","Anush","Collage","Exel","WPRO","Teknikpro","Wonder Nails","Mundial","Palladio", "Pinnacle","Nailway","TeknikStyle","Mohr Inc","Sally Hansen","Note","Pink Mask"]
let estado= ["Oferta", "Favoritos", "Nuevo", "Sin Estado" ]
let productos =[]

listado.forEach(producto=>{
    let categoria
    let marca
    let estados

    listadoCategorias.forEach((categoriaLista,index) => {
        if (categoriaLista === producto.categoria) {
            categoria = index + 1
        }
      });

    marcas.forEach((elemento,index) => {
        if (elemento === producto.marca) {
            marca = index + 1
        }
       
    }),
    estado.forEach((estadoProducto,index) => {
        if (estadoProducto === producto.estado) {
            estados = index + 1
        }else{
            estados=1}
       
    });
    
   
    let nuevo={
        nombre:producto.nombre,
        stock:producto.stock,
        precio:producto.precio,
        descripcion:producto.descripcion,
        color:producto.color ? producto.color : null,
        descuento:producto.descuento,
        categoriasid:categoria,
        marcasid:marca,
        estadosid:producto.estado === 'Oferta' ? 1 : producto.estado === "Favoritos" ? 2 : producto.estado === "Nuevo" ? 3 : 4,
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