// 'use strict';

let listado = require('./site/data/productos.json')

// let usuarios = listado.map(usuario =>{
//     let elemento = {
//       nombre: usuario.nombre,
//       apellido: usuario.apellido,
//       email: usuario.email,
//       contraseña: usuario.contraseña,
//       telefono: usuario.telefono,
//       generoId: usuario.genero === 'M' ? 1 : usuario.genero === "F" ? 2 : 3,
//       dni: usuario.dni,
//       rolId: usuario.rol === 'Administrador' ? 1 : 2,
//       imagen_perfil: usuario.imagenPerfil,
//       imagen_portada: usuario.imagenPortada
//     }
//     return elemento
//   })

// console.log(usuarios);

// module.exports = {
//   async up (queryInterface, Sequelize) {
 
//      await queryInterface.bulkInsert('Roles', roles, {});
   
//   },

//   async down (queryInterface, Sequelize) {
//   await queryInterface.bulkDelete('Roles', null, {});  
//   }
// };

let imagenes = []

listado.forEach(producto => {
  let imagen = {
    nombre: producto.imagen[0],
    productosid: producto.id,
    createdAt:new Date,
    updatedAt:new Date
  }
  let imagen2 = {
    nombre: producto.imagen[1],
    productosid: producto.id,
    createdAt:new Date,
    updatedAt:new Date
  }
  let imagen3 = {
    nombre: producto.imagen[2],
    productosid: producto.id,
    createdAt:new Date,
    updatedAt:new Date
  }
  let imagen4 = {
    nombre: producto.imagen[3],
    productosid: producto.id,
    createdAt:new Date,
    updatedAt:new Date
  }
  imagenes.push(imagen,imagen2,imagen3,imagen4)

})
console.log(imagenes);