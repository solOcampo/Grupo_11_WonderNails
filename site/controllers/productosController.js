const db = require('../database/models/index');
let Sequelize = require('sequelize')
let productos = require('../data/productos.json')
module.exports = {
    detail: (req,res) => {
        let idProduct = +req.params.id
        let producto = db.Productos.findByPk(idProduct, {
            include: [{
                all: true
            }]
        })
            .then((producto) => {
                db.Productos.findAll({
                    where: {
                        categoriasid: producto.categoriasid
                    },
                    limit: 4,
                    order: [[Sequelize.literal("RAND()")]],
                    include: [{
                        all: true
                    }]
                })
                .then(category => {
                        /* return res.send(category) */
                        return res.render('detalle', {
                            producto,
                            category
                        })
                    })
            })
    },
    cart: (req,res) => {
        return res.render('carrito')
    },
    nailPolish: (req,res) => {

        db.Productos.findAll({
            where: {
                categoriasid: 11
            },
            include: [{
                all: true
            }]
        })
            .then(esmaltes => {
                return res.render('esmaltes',{
                    esmaltes
                })
                return res.send(esmaltes)
            })
    },
    list: (req, res) => {
            let productosNuevos = db.Productos.findAll({
                where: {
                    estadosid: 3
                },
                include: [{
                    all: true
                }]
            });
            let productosFavs = db.Productos.findAll({
                where: {
                    estadosid: 2
                },
                include: [{
                    all: true
                }]
            });
            let productosOferta = db.Productos.findAll({
                where: {
                    estadosid: 1
                },
                include: [{
                    all: true
                }]
            });
            let esmaltes = db.Productos.findAll({
                where: {
                    categoriasid: 11
                },
                include: [{
                    all: true
                }]
            })
            let otros = db.Productos.findAll({
                where: {
                    estadosid: 4
                },
                include: [{
                    all: true
                }]
            })
            Promise.all([productosNuevos, productosFavs, productosOferta, esmaltes, otros])
            .then(([productosNuevos, productosFavs, productosOferta, esmaltes, otros]) => {
                let productosOfertaFiltrados = [];
                productosOferta.forEach((producto) => {
                    if (producto.categoriasid !== 11) {
                        productosOfertaFiltrados.push(producto)
                    }
                })
                    return res.render('productos',{
                        productosNuevos,
                        productosFavs,
                        productosOfertaFiltrados,
                        esmaltes,
                        otros
                    })
            })
        
    },
    state:(req, res) => {
        let estado = req.params.state;
        let idEstado
        let idCategoria
        if(req.params.state === "Oferta"){
            idEstado = 1
        } else if (req.params.state === "Favoritos"){
            idEstado = 2
        } else if (req.params.state === "Nuevo"){
            idEstado = 3
        } else if (req.params.state === "Otros"){
            idEstado = 4
            estado = "Otros"
        }
        if(req.params.state === "Aparatos"){
            idCategoria = 1
        }else if (req.params.state === "Esmaltado Semipermanente"){
            idCategoria = 2
        } else if (req.params.state === "Contrucción de Uñas"){
            idCategoria = 3
        } else if (req.params.state === "Esmaltado"){
            idCategoria = 4
        } else if (req.params.state === "Decoración"){
            idCategoria = 5
        } else if (req.params.state === "Herramientas"){
            idCategoria = 6
        } else if (req.params.state === "Accesorios"){
            idCategoria = 7
        } else if (req.params.state === "Aparatos"){
            idCategoria = 8
        } else if (req.params.state === "Cuidado de Manos y Pies"){
            idCategoria = 9
        } else if (req.params.state === "Maquillaje"){
            idCategoria = 10
        } else if (req.params.state === "Esmaltes"){
            idCategoria = 11
        }
        if(idCategoria){
            db.Productos.findAll({
                where: {
                    categoriasid: idCategoria
                },
                include: [{
                    all: true
                }]
            })
            .then(productos => {

                return res.render("estado",{
                    productos,
                    estado
                })
            })
            .catch(errors => res.send(errors))
        } else {
            db.Productos.findAll({
                where: {
                    estadosid : idEstado
                },
                include: [{
                    all: true
                }]
            })
            .then(productos => {
                return res.render("estado",{
                    productos,
                    estado
                })
            })
            .catch(errors => res.send(errors))
        }
        
    }
}