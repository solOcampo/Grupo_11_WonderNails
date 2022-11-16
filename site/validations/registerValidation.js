const {check, body} = require('express-validator')

module.exports = [
    /* nombre */
    check('name').trim()
    .notEmpty().withMessage('Debe ingresar su nombre').bail()
    .isLength({min:3}).withMessage('Debe contener al menos 3 caracteres'),
    
    /* apellido */
    check('lastname').trim()
    .notEmpty().withMessage('Debe ingresar su apellido').bail()
    .isLength({min:3}).withMessage('Debe contener al menos 3 caracteres'),
    
    /* email */
    check('email').trim()
    .notEmpty().withMessage('Debe ingresa su email').bail()
    .isEmail().withMessage('Debe ingresar un email valido'),
    
    /* contraseña */
    check('password')
    .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres'),
    
    /* confirmar contraseña */
    check('password2')
    .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres'),
    
    /* terminos y condiciones */
    check('terminos')
    .notEmpty().withMessage('Debe aceptar nuestros términos y condiciones   para poder continuar'),

    /* validacion contraseñas */
    body('password2')
    .custom((value, {req}) => value !== req.body.password ? false : true)
    .withMessage('Las contraseñas deben ser iguales')
]