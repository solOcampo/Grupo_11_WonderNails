const fs = require('fs')
const path = require('path')

let productos = require('../data/productos.json')
const save = (dato) => fs.writeFileSync(path.join(__dirname, '../data/productos.json')
    , JSON.stringify(dato, null, 4), 'utf-8')
/* let esmaltes = require('../data/esmaltes.json')
const saveEsmalte = (dato) => fs.writeFileSync(path.join(__dirname, '../data/esmaltes.json')
,JSON.stringify(dato,null,4),'utf-8') */

module.exports = {
    list: (req,res) => {
        return res.render('admin/listarProductos',{
            productos
        })
    },
    create:(req,res) => {
        return res.render('admin/crearProducto')
    },
    store: (req, res) => {
		let nuevoProd = {
			id: productos[productos.length - 1].id + 1,
  			nombre: req.body.nombre,
			marca : req.body.marca,
			categoria : req.body.categoria,
			estado : req.body.estado,
			precio : req.body.precio,
			descuento : req.body.descuento,
			stock : req.body.stock,
			descripcion : req.body.descripcion,
            imagen : req.body.imagen
		}

        productos.push(nuevoProd)
        save(productos)
		 return res.redirect('/admin/listar')
        
 
        /* if(nuevoProd.categoria === "Esmaltes"){
            esmaltes.push(nuevoProd)
            saveEsmalte(esmaltes)
            
        }else{
            productos.push(nuevoProd)
            save(productos)
        } */
	},
    edit:(req,res) => {
        id = +req.params.id
        let producto = productos.find((elemento) => {
            return elemento.id == id
        })
        /* return res.send(producto) Comprobar que esta llegando bien el elemento*/
        return res.render('admin/editarProducto',{
            producto
        })
    }/* ,
    store:(req,res) => {
        let producto = req.body
        res.send(producto)
    } */
}