let {create,edit,list,store,update, destroy} = require('../controllers/adminController')
const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/listar', list)

/* Creando un producto */
router.get('/crear', create)
router.post('/crear', store)


router.get('/editar/:id', edit)
router.put('/editar/:id', update)


/* Eliminando un producto */
router.delete('/destroy/:id', destroy);
// router.delete('/destroy/:id', destroy);
// router.delete('/restore/:id', restore);
// router.delete('/crash/:id', crash);

module.exports = router 