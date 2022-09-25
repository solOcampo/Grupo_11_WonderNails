const express = require('express')
const router = express.Router()
const userCheckCart = require('../middlewares/userCheckCart')

let {cart,detail, nailPolish, list, state, category} = require('../controllers/productosController')

/* Todos los productos */
router.get('/', list)
/* Productos por estado */
router.get('/nuevos', state)
router.get('/favoritos', state)
router.get('/ofertas', state)
/* Esmaltes */
router.get('/esmaltes', nailPolish)
/* Carrito de compras */
router.get('/carrito/', userCheckCart,cart)
router.get('/carrito/:id', userCheckCart, cart)
/* Detalle de productos */
router.get('/detalle/:id', detail)

module.exports = router