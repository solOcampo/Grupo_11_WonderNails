const { check } = require('express-validator')


module.exports = [
  /* Nombre */
  check('nombre').trim()
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isLength({ min: 5 }).withMessage('Debe contener al menos 5 caracteres'),

  /* Marca */
  check('marca').trim()
    .notEmpty().withMessage('Este campo es obligatorio'),

  /* Categoria */
  check('categoria').trim()
    .notEmpty().withMessage('Debe seleccionar una categoria'),

  // /* Estado */
  // check('estado').trim()
  //   .notEmpty().withMessage('Debe seleccionar un estado'),

  /* Color */
  check('color').trim()
    .notEmpty().withMessage('Debe seleccionar un color'),

  /* Precio */
  check('precio').trim()
    .notEmpty().withMessage('Este campo es obligatorio').bail(),

  /* Descuento */
  check('descuento').trim()
  .isInt().withMessage('Este campo es obligatorio'),

  /* Stock */
  check('stock').trim()
    .notEmpty().withMessage('Este campo es obligatorio'),
  

  /* Descripcion */
  check('descripcion').trim()
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isLength({ min: 10 }).withMessage('Debe contener al menos 10 caracteres'),

]