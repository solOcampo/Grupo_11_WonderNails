let { home, search } = require('../controllers/indexController')
const express = require('express')
const db = require('../database/models')
const productos = require('../database/models/productos')
const router = express.Router()



router.get('/', home)
router.get('/buscar', search);

router.get('/prueba', (req, res) => {
    db.Estados.findAll(
        {
            include: [{
                all: true
            }]
        }


    ).then(
        productos => {
            res.send(productos)
        }
    ).catch(errors=> res.send(errors))
});

module.exports = router