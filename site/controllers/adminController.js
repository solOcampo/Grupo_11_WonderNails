const fs = require('fs')
const path = require('path')
let productos = require('../data/productos.json')
const { validationResult } = require('express-validator')
let db = require('../database/models')

module.exports = {
    list: (req, res) => {
        db.Productos.findAll({
            include: [{
                all: true
            }]
        })
            .then(productos => {
                // return res.send(productos)
                return res.render('admin/listarProductos', {
                    productos
                })

            })
    },
    // **Ejemplo de como utilizar .then**
    // create: (req, res) => {
    //     let categorias = db.Categorias.findAll()
    //     let marcas = db.Marcas.findAll()
    //     let estados=db.Estados.findAll()
    //     Promise.all([categorias,marcas,estados])
    //     .then(([categorias,marcas,estados]) => {
    //         return res.render('admin/crearProducto',{
    //             categorias,
    //             marcas,
    //             estados
    //         })
    //     })
    //     .catch(error => res.send(error))
    create: async (req, res) => {
        try {
            let categorias = await db.Categorias.findAll()
            let marcas = await db.Marcas.findAll()
            let estados = await db.Estados.findAll()
            return res.render('admin/crearProducto', {
                categorias,
                marcas,
                estados
            })
        } catch (error) {
            return res.send(errors)
        }
    },
    store: async (req, res) => {
        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }

        if (errors.isEmpty()) {
         db.Productos.create({
                    id: productos[productos.length - 1].id + 1,
                    nombre: req.body.nombre,
                    marcasid: req.body.marca,
                    categoriasid: req.body.categoria,
                    estadosid: req.body.estado,
                    color: req.body.color,
                    precio: req.body.precio,
                    descuento: req.body.descuento,
                    stock: req.body.stock,
                    descripcion: req.body.descripcion,

                })
                .then (nuevoProd=>{
                if (req.files) {
                    let img = req.files.map(imagen=>{
                        let nuevo ={
                            nombre:imagen.filename,
                            Productos_id: nuevoProd.id
                        }
                        return nuevo
                  
                    })
                    db.Productos_imagenes.bulkCreate(img)
                    .then(Productos_imagenes => {
                        return res.redirect('/admin/listar')
                    })
                   
                } else {
                    db.Productos_imagenes.create({
                        nombre:'default-image.png',
                        Productos_id: nuevoProd.id
                    })
                }

            })
            .catch(error=>res.send(error))
               
            }else{

            // let id = productos[productos.length - 1].id + 1;
            // let img = req.files.map(imagen => {
            //     return imagen.filename
            // })
            let ruta = fs.existsSync(path.join(__dirname, '..', 'public', 'img', 'Products', img))
            req.files.forEach(imagen => {
                if (ruta(imagen) && (imagen !== "default-image.png")) {
                    fs.unlinkSync(path.join(__dirname, '..', 'public', 'img', 'Products', imagen))
                }
            })
            /* return res.send(errors.mapped()) */
            return res.render('admin/crearProducto', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },

        //     img.forEach(imagen => {
        //         if (ruta(imagen) && (imagen !== "default-image.png")) {
        //             fs.unlinkSync(path.join(__dirname, '..', 'public', 'img', 'Products', imagen))
        //         }
        //     })  /* No logré que funcione */
        //     // return res.send(req.body)
        //     //  return res.send(errors.mapped())
        //     return res.render('admin/crearProducto', {
        //         errors: errors.mapped(),
        //         old: req.body
        //     })
        // }

    edit: (req, res) => {
        let estado = ['Nuevo', 'Favoritos', 'Oferta']
        let categoria = ['Esmaltado', ' Esmaltado Semipermanente', ' Construcción de uñas', ' Decoración', 'Esmaltes', ' Herramientas', '  Accesorios', '  Aparatos', ' Cuidado de Manos y Pies', 'Maquillaje']
        const id = +req.params.id;
        let producto = productos.find(producto => producto.id === id);
        return res.render('admin/editarProducto', {
            producto,
            categoria,
            estado
        })
    },
    update: (req, res) => {
        idParams = +req.params.id
        let { nombre, marca, estado, color, categorias, precio, descuento, stock, descripcion } = req.body
        productos.forEach(producto => {
            if (producto.id === idParams) {
                producto.nombre = nombre,
                    producto.marca = marca,
                    producto.categorias = categorias,
                    producto.estado = estado,
                    producto.color = color,
                    producto.precio = +precio,
                    producto.descuento = +descuento,
                    producto.stock = +stock,
                    producto.descripcion = descripcion

            }
        })
        save(productos)
        return res.redirect('/admin/listar')
    },
    destroy: (req, res) => {
        let id = +req.params.id
        let products = productos.filter(producto => producto.id != id);
        save(products)
        return res.redirect('/admin/listar')

    }
}

