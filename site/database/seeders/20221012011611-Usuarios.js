'use strict';

let listado = require('../../data/users.json')

let usuarios = listado.map(usuario =>{
  let elemento = {
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email,
    contraseña: usuario.contraseña,
    telefono: usuario.telefono,
    generoId: usuario.genero === 'M' ? 1 : usuario.genero === "F" ? 2 : 3,
    dni: usuario.dni,
    rolId: usuario.rol === 'Administrador' ? 1 : 2,
    imagen_Perfil: usuario.imagenPerfil,
    imagen_Portada: usuario.imagenPortada,
    createdAt: new Date,
    updatedAt: new Date
  }
  
  return elemento
})

module.exports = {
  async up (queryInterface, Sequelize) {
 
     await queryInterface.bulkInsert('Usuarios', usuarios, {});
   
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Usuarios', null, {});  
  }
};

