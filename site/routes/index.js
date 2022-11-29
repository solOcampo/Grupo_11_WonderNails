let { home, search,cookies,privacidad, ventas,terminos, Pcookies, nosotros } = require('../controllers/indexController')
const express = require('express')
const db = require('../database/models')
const productos = require('../database/models/productos')
const router = express.Router()



router.get('/', home)
router.get('/buscar', search);
router.get('/cookies', cookies);
router.get('/politicas', privacidad);
router.get('/ventas', ventas);
router.get('/terminos', terminos);
router.get('/politicas-de-cookies', Pcookies);
router.get('/nosotros', nosotros);







router.get('/prueba', (req, res) => {
    db.Productos.findAll(
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