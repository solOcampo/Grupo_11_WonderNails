const fs = require('fs')
const path = require('path')
// let productos = require('../data/productos.json')
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
    // },
    create: async (req, res) => {
        // return res.send(errors)
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
    store:(req, res) => {
        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }

        if (errors.isEmpty()) {
            let {nombre,marca,categoria,estado,color,precio,descuento,stock,descripcion}=req.body
            db.Productos.create({
                nombre: nombre,
                marcasid: +marca,
                categoriasid:+categoria,
                estadosid:+estado,
                color: color,
                precio: +precio,
                descuento: +descuento,
                stock: +stock,
                descripcion,

            })
                .then(nuevoProd => {
                    if (req.files) {
                        let img = req.files.map(imagen => {
                            let nuevo = {
                                nombre: imagen.filename,
                                productosid: nuevoProd.id
                            }
                            return nuevo

                        })
                        db.Productos_imagenes.bulkCreate(img)
                            .then(imagenes => {
                                return res.redirect('admin/listarProductos')
                            })

                    } else {
                        db.Productos_imagenes.create({
                            nombre: 'default-image.png',
                            productosid: nuevoProd.id
                        })
                        .then(imagenes =>{
                            return res.redirect('admin/listarProductos')
                        })
                    }

                })
                .catch(error => res.send(error))

        } else {

            let ruta = (dato)=>fs.existsSync(path.join(__dirname, '..', 'public', 'img', 'Products', dato))
            req.files.forEach(imagen => {
                if (ruta(imagen) && (imagen !== "default-image.png")) {
                    fs.unlinkSync(path.join(__dirname, '..', 'public', 'img', 'Products', imagen))
                }
            })
        //    return res.send(errors.mapped()) 
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
        let idParams = +req.params.id
        let categorias = db.Categorias.findAll()
        let marcas = db.Marcas.findAll()
        let estados = db.Estados.findAll()
        let producto = db.Productos.findOne({
            where: {
                id: idParams
            },
            include: [{
                all: true
            }]
        })
        Promise.all([categorias, marcas, estados, producto])
            .then(([categorias, marcas, estados, producto]) => {
                // return res.send(producto) //Comprobar que esta llegando bien el elemento
                return res.render('admin/editarProducto', {
                    producto,
                    categorias,
                    marcas,
                    estados
                })
            })
            .catch(error => res.send(error))
    },
    update: (req, res) => {
        // return res.send(req.files)
        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {
            idParams = +req.params.id
            let { nombre, marca, estado, color, categorias, precio, descuento, stock, descripcion } = req.body
            let producto = db.Productos.findOne({
                where: {
                    id: idParams
                },
                include: [{
                    all: true
                }]
            })
            let actualizacion = db.Productos.update({
                nombre: nombre,
                precio: +precio,
                descuento: +descuento,
                stock: +stock,
                descripcion,
                color,
                categoriasid: categorias,
                marcasid: marca,
                estadosid: estado
            }, {
                where: {
                    id: idParams
                }
            })

            Promise.all([producto, actualizacion])
                .then(([producto, actualizacion]) => {

                    let imagen1
                    let imagen2
                    let imagen3
                    let imagen4
                    let promesas = []

                    /* Imagen 1 */
                    if (producto.imagenes[0].length !== 0) {
                        if (!!req.files.imagen1) {
                            imagen1 = producto.imagenes[0].nombre
                            promesas.push(
                                db.Productos_imagenes.update({
                                    nombre: req.files.imagen1[0].filename
                                }, {
                                    where: {
                                        id: producto.imagenes[0].id
                                    }
                                }))
                         
                            if (fs.existsSync(path.join(__dirname, '../../public/img/Products', imagen1))) {
                                fs.unlinkSync(path.join(__dirname, '../../public/img/Products', imagen1))
                            }
                        }
                    } else {
                       
                        if (!!req.files.imagen1) {
                            promesas.push(
                                db.Productos_imagenes.create({
                                    nombre: req.files.imagen1[0].filename,
                                    productosid: producto.id
                                }))
                        }
                       
                    } 
                    // imagen2
                        if (producto.imagenes[1].length !== 0) {
                            if (!!req.files.imagen2) {
                                imagen2 = producto.imagenes[1].nombre
                                promesas.push(
                                    db.Productos_imagenes.update({
                                        nombre: req.files.imagen2[0].filename
                                    }, {
                                        where: {
                                            id: producto.imagenes[1].id
                                        }
                                    }))
                             
                                if (fs.existsSync(path.join(__dirname, '../../public/img/Products', imagen2))) {
                                    fs.unlinkSync(path.join(__dirname, '../../public/img/Products', imagen2))
                                }
                            }
                        } else {
                           
                            if (!!req.files.imagen2) {
                                promesas.push(
                                    db.Productos_imagenes.create({
                                        nombre: req.files.imagen2[0].filename,
                                        productosid: producto.id
                                    }))
                            }
                           
                        } 
                        // imagen3
                    if (producto.imagenes[2].length !== 0) {
                        if (!!req.files.imagen3) {
                            imagen3 = producto.imagenes[2].nombre
                            promesas.push(
                                db.Productos_imagenes.update({
                                    nombre: req.files.imagen3[0].filename
                                }, {
                                    where: {
                                        id: producto.imagenes[2].id
                                    }
                                }))
                         
                            if (fs.existsSync(path.join(__dirname, '../../public/img/Products', imagen3))) {
                                fs.unlinkSync(path.join(__dirname, '../../public/img/Products', imagen3))
                            }
                        }
                    } else {
                       
                        if (!!req.files.imagen3) {
                            promesas.push(
                                db.Productos_imagenes.create({
                                    nombre: req.files.imagen3[0].filename,
                                    productosid: producto.id
                                }))
                        }
                       
                    } 
                    // imagen4
                        if (producto.imagenes[3].length !== 0) {
                            if (!!req.files.imagen4) {
                                imagen4 = producto.imagenes[3].nombre
                                promesas.push(
                                    db.Productos_imagenes.update({
                                        nombre: req.files.imagen4[0].filename
                                    }, {
                                        where: {
                                            id: producto.imagenes[3].id
                                        }
                                    }))
                             
                                if (fs.existsSync(path.join(__dirname, '../../public/img/Products', imagen4))) {
                                    fs.unlinkSync(path.join(__dirname, '../../public/img/Products', imagen4))
                                }
                            }
                        } else {
                           
                            if (!!req.files.imagen4) {
                                promesas.push(
                                    db.Productos_imagenes.create({
                                        nombre: req.files.imagen4[0].filename,
                                        productosid: producto.id
                                    }))
                            }
                           
                        } 
                    Promise.all(promesas)
                    .then(promesas => {
                        return res.redirect('/admin/listar')
                    })
                })
                .catch(error => res.send(error))
            } else {
                return res.render('admin/crearProducto', {
                    errors: errors.mapped(),
                    old: req.body
                })
            } 
        },
 
    destroy: (req, res) => {
        let id = +req.params.id
        db.Productos.destroy({
            where: {
                id: id
            },

        }).then(producto => {
            return res.redirect('/admin/listar')


        }).catch(error => res.send(error))
    }
}
