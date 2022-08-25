const express = require('express')
const router = express.Router()

let {carrito,detalle, esmaltes, listado} = require('../controllers/productosController')

/* Todos los productos */
router.get('/', listado)
/* Esmaltes */
router.get('/esmaltes', esmaltes)
/* Carrito de compras */
router.get('/carrito/:id', carrito)
/* Detalle de productos */
router.get('/detalle/:id', detalle)

module.exports = router