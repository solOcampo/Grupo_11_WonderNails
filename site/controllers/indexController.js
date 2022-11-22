let db = require('../database/models')

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
        let estado = req.params.estado
        let productoss= db.Productos.findAll({
            include: ['category','marca','estado','imagenes']
           })
        let productossearch = productoss.filter((product) => product.estado === estado)
        if(estado === productoss[0].estado){
            return res.render('buscar',{
                productossearch,
                estado
            })
        }
        
   

        let resultados = productoss.filter(producto => {
            return producto.marca === elemento.toLowerCase() || (producto.nombre.toLowerCase().includes(elemento.toLowerCase())) /* || (producto.descripcion.toLowerCase().includes(elemento.toLowerCase())) */
        })
        
        //  let resultados = productos.filter(producto => {
        //     return (producto.nombre.toLowerCase().indexOf(elemento.toLowerCase()) != -1)
        // }) 
        //  return res.send(resultados)    let id = +req.params.id
 

    
        return res.render('buscar',
            {
                buscar: elemento,
                resultados,
                productossearch
               
             
                
            });
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
