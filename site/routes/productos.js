const express = require('express')
const router = express.Router()

let {carrito,detalle, esmaltes, listado, estado, categoria} = require('../controllers/productosController')

/* Todos los productos */
router.get('/', listado)
/* Productos por estado */
router.get('/nuevos', estado)
router.get('/favoritos', estado)
router.get('/ofertas', estado)
/* Esmaltes */
router.get('/esmaltes', esmaltes)
/* Carrito de compras */
router.get('/carrito/:id', carrito)
/* Detalle de productos */
router.get('/detalle/:id', detalle)

module.exports = router