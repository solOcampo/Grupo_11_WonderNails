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
                categoriasid: 22
            },
            include: [{
                all: true
            }]
        })
        Promise.all([productos, productosOferta, productosFavs, productosNuevos, esmaltes])
        .then(([productos, productosOferta, productosFavs, productosNuevos, esmaltes]) => {
            
            return res.render('home',{
                productos,
                productosOferta,
                productosFavs,
                productosNuevos,
                esmaltes
            });
        })
       .catch(error=>res.send(error))
       /* return res.render('home', {
        productos
    }) */
        /* .then(producto => {
            const esmaltes = db.Productos.findAll({
                 where: {
                     categoriasId: producto.categoriasId
                 }
             })
            const productosNuevos = db.Estados.findOne({
                 where: {
                    estado: "Nuevo"
                 },
                 include : [
                    {
                        association : 'productos',
                        include : [{
                            all:true
                        }]
                    }
                ]
             })
            const productosFavs = db.Estados.findOne({
                 where: {
                    estado: "Favoritos"
                 },
                 include : [
                    {
                        association : 'productos',
                        include : [{
                            all:true
                        }]
                    }
                ]
             })
            const productosOferta = db.Estados.findOne({
                 where: {
                    estado: "Oferta"
                 },
                 include : [
                    {
                        association : 'productos',
                        include : [{
                            all:true
                        }]
                    }
                ]
             })
            
            .then(([productos])=>{
                let productosTodos = db.Productos.findAll({
                    include: [{ all : true}]
                })
                return res.send(productosTodos)
             return res.render('home', {
                 productosTodos,
                 productosNuevos,
                 productosFavs,
                 productosOferta,
                 esmaltes
             })
     
            })
       })
       .catch(error=>res.send(error)) */
      
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
    }
}
