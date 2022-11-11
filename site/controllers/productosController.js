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
            let productosNuevos = [];
            let productosFavs = [];
            let productosOferta = [];
            let esmaltes = []
            let otros = []
            productos.forEach(producto => {
                if (producto.estado === "Nuevo") {
                return productosNuevos.push(producto);
                }else if(producto.estado === "Favoritos"){
                    return productosFavs.push(producto)
                }else if(producto.estado === "Oferta"){
                    return productosOferta.push(producto)
                }else if(producto.categoria === "Esmaltes"){
                    return esmaltes.push(producto)
                }else if(producto.estado === ""){
                    return otros.push(producto)
                }
            });
            return res.render('productos',{
                productos,
                productosNuevos,
                productosFavs,
                productosOferta,
                esmaltes,
                otros
            })
        
    },
    state:(req, res) => {
        let estado = req.params.estado
        let productosE = productos.filter((product) => product.estado === estado)
        if(estado === productosE[0].estado){
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