const express = require('express')
let {login,register, check, profil,processLogin, editProfil, changeProfilPic,logout} = require('../controllers/usuariosController')
const router = express.Router()

const userIsLogin = require("../middlewares/userIsLoginCheck");
const userIsNotLogin = require("../middlewares/userIsNotLoginCheck");

const registerValidator = require('../validations/registerValidation')
const loginValidator = require('../validations/loginValidation')

/* multer */
const upload = require('../middlewares/multerUsuarios')

/* registro */
router.get('/register', userIsNotLogin, register)
router.post('/perfil', registerValidator,check)

/* login */
router.get('/login', userIsNotLogin, login)
router.post('/login',loginValidator,processLogin)

/* perfil */
router.get('/perfil', userIsLogin, profil)
router.put('/perfil', upload.fields([
    {name:'imagenPerfil',maxCount: 1},
    {name:'imagenPortada',maxCount: 1},
    ]),changeProfilPic)
router.delete('/logout', logout);

/* editar perfil */
router.get('/perfil/editar', editProfil)
router.put('/perfil/editar', editProfil)

module.exports = router