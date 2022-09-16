let {create,edit,list,store,update, destroy, create2} = require('../controllers/adminController')
const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multerProducts')
const productValidator = require('../validations/productsValidation')



/* GET home page. */
router.get('/listar', list)

/* Creando un producto */
router.get('/crear', create)
router.get('/crear2',create2)
router.post('/crear',upload.array('imagen'),productValidator,store);

router.get('/editar/:id', edit)
router.put('/editar/:id',upload.array('imagenes'),productValidator,update)


/* Eliminando un producto */
router.delete('/destroy/:id', destroy);
// router.delete('/destroy/:id', destroy);
// router.delete('/restore/:id', restore);
// router.delete('/crash/:id', crash);

module.exports = router  