const express = require('express')
const router = express.Router()
const registerValidator = require('../validations/registerValidation')

let {login,register, check, perfil} = require('../controllers/usuariosController')

router.get('/register', register)
router.post('/perfil', registerValidator,check)

router.get('/login', login)
router.get('/perfil', perfil)

module.exports = router