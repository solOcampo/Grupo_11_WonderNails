const {check,body} = require('express-validator')
const usuarios = require('../data/users.json')


module.exports = [
    /* Email */
    check('email').trim()
    .notEmpty().withMessage('Debe ingresar su email').bail()
    .isEmail().withMessage('Debe ingresar un email valido'),

    /* Contraseña */
    check('password').trim()
    .notEmpty().withMessage('Debe ingresar su contraseña').bail()
    .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres'),

    // body('email')
    // .custom((value,{req}) =>{
        
    //     let usuario = usuarios.find(user => user.email === value && bcryptjs.compareSync(req.body.password, user.password))

    //     if (usuario) {
    //         return true
    //     }else{
    //         return false
    //     }
    // })
    // .withMessage('El email o la contraseña no coincide')
    /* .withMessage('El usuario no se encuentra registrado o las credenciales son invalidas') */
]
