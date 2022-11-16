const {check,body} = require('express-validator')
const db = require('../database/models/index');
const usuarios = require('../data/users.json')
const bcryptjs = require('bcryptjs')

module.exports = [
    /* Email */
    check('email').trim()
    .notEmpty().withMessage('Debe ingresar su email').bail()
    .isEmail().withMessage('Debe ingresar un email valido'),

    /* Contraseña */
    check('password').trim()
    .notEmpty().withMessage('Debe ingresar su contraseña').bail()
    .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres'),

    body('password')
        .custom((value, {req}) => {
           return db.Usuarios.findOne({
                where: {
                    email: req.body.email,
                }
           })
           .then(usuario => {
               if (!bcryptjs.compareSync(value, usuario.dataValues.contraseña)){
                return Promise.reject()
               }
           })
           .catch(error => Promise.reject('El email o la contraseña es invalido'))
        })
        /* .custom((value, {req}) => {
           db.Usuarios.findOne({
                where: {
                    email: value,
                }
           })
           .then(usuario => {
               if (usuario && bcryptjs.compareSync(req.body.pass, usuario.contraseña)){
                return true
               }else{
                return false
               }
           })
           .catch(error => Promise.reject('Email o contraseña incorrectos'))
        })
        .withMessage('El email o la contraseña es invalido') */
        /* .custom((value, {req}) => {
           return db.Usuarios.findOne({
                where: {
                    email: value,
                }
           })
           .then(usuario => {
               if (!usuario && !bcryptjs.compareSync(req.body.pass, usuario.contraseña)){
                return promise.reject()
               }
           })
           .catch(error => Promise.reject('El email o la contraseña iconrrecta'))
        }) */
]
