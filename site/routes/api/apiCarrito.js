const {listCart,addItem,modifyItem,removeItem,empty} = require('../../controllers/api/carrito');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', listCart);

router.post('/:id', addItem);
router.delete('/item/:id', modifyItem);

router.delete('/:id', removeItem);
router.delete('/:empty', empty);



module.exports = router;