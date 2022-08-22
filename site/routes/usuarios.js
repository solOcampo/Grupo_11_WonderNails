const express = require('express')
const router = express.Router()

let {login,register,perfil} = require('../controllers/usuariosController')

router.get('/register', register)
router.get('/login', login)
router.get('/perfil', perfil)

module.exports = router