let db = require('../database/models')
const { Op } = require("sequelize");


module.exports = {
    home: (req, res) => {
       
        let productos = db.Productos.findAll({
            include: [{
                all: true
            }]
        })
        let productosOferta = db.Productos.findAll({
            where: {
                estadosid: 1
            },
            include: [{
                all: true
            }]
        })
        
        let productosFavs = db.Productos.findAll({
            where: {
                estadosid: 2
            },
            include: [{
                all: true
            }]
        })
        let productosNuevos = db.Productos.findAll({
            where: {
                estadosid: 3
            },
            include: [{
                all: true
            }]
        })
        let esmaltes = db.Productos.findAll({
            where: {
                categoriasid: 11
            },
            include: [{
                all: true
            }]
        })
        Promise.all([productos, productosOferta, productosFavs, productosNuevos, esmaltes])
        .then(([productos, productosOferta, productosFavs, productosNuevos, esmaltes]) => {
            /* return res.send(esmaltes) */
            return res.render('home',{
                productos,
                productosOferta,
                productosFavs,
                productosNuevos,
                esmaltes
            });
        })
       .catch(error=>res.send(error))
      
    },

    search: (req, res) => {
       let elemento = req.query.search

       db.Productos.findAll({
        where : {
            [Op.or] : [
                {nombre : {[Op.substring] : elemento}},
                {descripcion : {[Op.substring] : elemento}},
            ]
        },
        include:[
          {all:true}
        ]
    })
    .then((resultados) => {
          return res.render('buscar', 
        {
            buscar: elemento,
            resultados,
        })
    })
    .catch(error => res.send(error))
},
    
    cookies :(req, res) => { 
        return res.render('aviso-cookies')
    },
    privacidad:(req,res)=>{
        return res.render('politicas')
    },
    ventas:(req,res)=>{
        return res.render('politicasdeVentas')
    },
    terminos:(req,res)=>{
        return res.render('terminos')
    },
    Pcookies:(req,res)=>{
        return res.render('politicasdeCookies')
    },
    nosotros:(req,res)=>{
        return res.render('nosotros')
    }


}
