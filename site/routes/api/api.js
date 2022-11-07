const express = require('express')
const router = express.Router()

const {list}= require('../../controllers/apiController.js/apiController')



/* Productos */
router.get('/productos', list)

module.exports = router