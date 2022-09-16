const express = require('express')
const router = express.Router()

const registerValidator = require('../validations/registerValidation')
const loginValidator = require('../validations/loginValidation')
const upload = require('../middlewares/multerUsuarios')
let {login,register,perfil,processRegister,processLogin} = require('../controllers/usuariosController')


router.get('/register', register)
router.post('/register',upload.single('image'),registerValidator,processRegister)

router.get('/login', login)
router.post('/login',loginValidator,processLogin)

router.get('/perfil', perfil)

module.exports = router