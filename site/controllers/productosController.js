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

                    return res.render('productos',{
                        productosNuevos,
                        productosFavs,
                        productosOferta,
                        esmaltes,
                        otros
                    })
            })
        
    },
    state:(req, res) => {
        let estado = req.params.estado
        let productosE = productos.filter((product) => product.estado === estado)
        if(estado === productosE[0].estado){
            return res.send(estado)
            return res.render('estado',{
                productosE,
                estado
            })
        }
        
    },
    category:(req, res) => {
        let categoria = req.params.categoria
        /* let productosC = productos.filter((product) => product.categoria.toLowerCase() === categoria) */
        /* return res.render('categoria',{
            productosC,
            categoria
        }) */
    }
}