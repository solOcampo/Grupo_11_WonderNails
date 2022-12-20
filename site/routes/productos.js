const express = require('express')
const router = express.Router()
const userCheckCart = require('../middlewares/userCheckCart')

let {cart,detail, nailPolish, list, state, category} = require('../controllers/productosController')

/* Todos los productos */
router.get('/', list)

/* Esmaltes */
router.get('/esmaltes', nailPolish)
/* Carrito de compras */

router.get('/carrito',userCheckCart,cart)
// router.get('/carrito/:id', userCheckCart, cart)

/* Productos por estado */
router.get('/:state', state)

router.get('/detalle/:id', detail)

module.exports = router