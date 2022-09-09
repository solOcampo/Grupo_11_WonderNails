let {home,search} = require('../controllers/indexController')
const express = require('express')
const router = express.Router()



router.get('/', home)
router.get('/buscar', search);


module.exports = router