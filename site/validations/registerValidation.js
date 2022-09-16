const {check,body} = require('express-validator')

module.exports = [
    /* Nombre */
    check('name').trim()
    .notEmpty().withMessage('Debe ingresar su nombre').bail()
    .isLength({min:2}).withMessage('Debe contener al menos 2 caracteres'),

    /* Email */
    check('email').trim()
    .notEmpty().withMessage('Debe ingresar su email').bail()
    .isEmail().withMessage('Debe ingresar un email valido'),

    /* Contraseña */
    check('password')
    .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres'),
    check('password2')
    .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres').bail(),

   
    /* terminos */
    check('terminos')
    .notEmpty().withMessage('Debe Aceptar nuestros terminos y condiciones'),

    body('password2')
    .custom((value,{req}) => value !== req.body.password2 ? false : true)
    .withMessage('Las contraseñas no coinciden')
]