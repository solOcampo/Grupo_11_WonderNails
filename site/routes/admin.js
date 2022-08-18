let {create,edit,list,store} = require('../controllers/adminController')
const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/listar', list)

/* Creando un producto */
router.get('/crear', create)
router.post('/crear', store)

router.get('/editar/:id', edit)

module.exports = router 