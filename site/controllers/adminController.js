const fs = require('fs')
const path = require('path')
let productos = require('../data/productos.json')
const { validationResult } = require('express-validator')
const save = (dato) => fs.writeFileSync(path.join(__dirname, '../data/productos.json')
    , JSON.stringify(dato, null, 4), 'utf-8')


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
        let errors = validationResult(req)
   
        if (errors.isEmpty()) {
            let img = req.files.map(imagen => {
                return imagen.filename
            })
		let nuevoProd = {
			id: productos[productos.length - 1].id + 1,
  			nombre: req.body.nombre,
			marca : req.body.marca,
			categoria : req.body.categoria,
			estado : req.body.estado,
            color: req.body.color,
			precio : req.body.precio,
			descuento : req.body.descuento,
			stock : req.body.stock,
			descripcion : req.body.descripcion,
            imagenes: (req.files.length === 4) ? img : ['default-image.png', 'default-image.png', 'default-image.png', 'default-image.png'],
		}

        productos.push(nuevoProd)
        save(productos)
       return res.redirect('/admin/listar')
    } else {
        let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'img', 'products', dato))

        req.files.forEach(imagen => {
            if (ruta(imagen) && (imagen !== "default-image.png")) {
                fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'img', 'products', imagen))
            }
        })
        // return res.send(req.body)
        //  return res.send(errors.mapped())
         return res.render('admin/crearProducto', {
           errors: errors.mapped(),
            old: req.body
        })
    }
},
    edit:(req,res) => {
        let estado = ['Nuevo','Favoritos','Oferta']
        let categoria = ['Esmaltado', ' Esmaltado Semipermanente', ' Construcción de uñas',' Decoración','Esmaltes',' Herramientas','  Accesorios','  Aparatos',' Cuidado de Manos y Pies','Maquillaje']
    	const id=+req.params.id;
        let producto = productos.find(producto=> producto.id===id);
     return res.render('admin/editarProducto',{
           producto,
           categoria,
           estado
        })
    },
    update: (req, res) => {
        idParams=+req.params.id
        let { nombre, marca,estado,color,categorias,precio,descuento,stock,descripcion } = req.body
        productos.forEach(producto => {
                if (producto.id === idParams) {
                    producto.nombre = nombre,
                    producto.marca = marca,
                    producto.categorias = categorias,
                    producto.estado=estado,
                    producto.color=color,
                    producto.precio = +precio,
                    producto.descuento = +descuento,
                    producto.stock = +stock,
                    producto.descripcion = descripcion
                  
                }
            })
            save(productos)
            return res.redirect('/admin/listar')
        },
       destroy:(req,res)=>{
         let id = +req.params.id
        let products = productos.filter(producto => producto.id != id);
           save(products)
            return res.redirect('/admin/listar')

       }
    }