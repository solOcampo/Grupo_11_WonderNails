const express = require('express')
const router = express.Router()
const registerValidator = require('../validations/registerValidation')
const loginValidator = require('../validations/loginValidation')
let {login,register, check, perfil,processLogin} = require('../controllers/usuariosController')


router.get('/register', register)
router.post('/perfil', registerValidator,check)

router.get('/login', login)
router.post('/login'/* ,loginValidator */,processLogin)

router.get('/perfil', perfil)

module.exports = router