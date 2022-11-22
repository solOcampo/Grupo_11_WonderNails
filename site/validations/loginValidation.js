const {check,body} = require('express-validator')
const db = require('../database/models/index');
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
    ]