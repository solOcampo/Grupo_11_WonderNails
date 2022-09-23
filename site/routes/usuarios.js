const express = require('express')
let {login,register, check, profil,processLogin, editProfil, changeProfilPic,logout} = require('../controllers/usuariosController')
const router = express.Router()

const registerValidator = require('../validations/registerValidation')
const loginValidator = require('../validations/loginValidation')
const upload = require('../middlewares/multerUsuarios')

/* registro */
router.get('/register', register)
router.post('/perfil', registerValidator,check)

/* login */
router.get('/login', login)
router.post('/login',loginValidator,processLogin)

/* perfil */
router.get('/perfil', profil)
router.put('/perfil', upload.single('imagenPerfil'),changeProfilPic)
router.delete('/logout', logout);

/* editar perfil */
router.get('/perfil/editar', editProfil)
router.put('/perfil/editar', editProfil)

module.exports = router