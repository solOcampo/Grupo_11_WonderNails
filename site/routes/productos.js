const express = require('express')
const router = express.Router()

let {carrito,detalle, esmaltes} = require('../controllers/productosController')

router.get('/esmaltes', esmaltes)
router.get('/carrito', carrito)
router.get('/detalle', detalle)

module.exports = router