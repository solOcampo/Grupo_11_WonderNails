let productoss = require('../data/productos.json')
let db = require('../database/models')

module.exports = {
    home: (req, res) => {
        // let productosNuevos = [];
        // let productosFavs = [];
        // let productosOferta = [];
        // let esmaltes = [];
        // productos.forEach(producto => {
        //     if (producto.estado === "Nuevo") {
        //         return productosNuevos.push(producto);
        //     } else if (producto.estado === "Favoritos") {
        //         return productosFavs.push(producto)
        //     } else if (producto.estado === "Oferta") {
        //         return productosOferta.push(producto)
        //     }else if(producto.categoria === "Esmaltes"){
        //         return esmaltes.push(producto)
        //     }
        // });
        const esmaltes = productoss.filter(prod => prod.categoria === "Esmaltes")
        const productosNuevos = productoss.filter(prod => prod.estado === "Nuevo")
        const productosFavs = productoss.filter(prod => prod.estado === "Favoritos")
        const productosOferta = productoss.filter(prod => prod.estado === "Oferta")
       
       let productos= db.Productos.findAll({
        include: ['category','marca','estado','imagenes']
       })
       Promise.all([productos])
       .then(([productos])=>{
        // return res.send(productos)
        return res.render('home', {
            productos,
            productosNuevos,
            productosFavs,
            productosOferta,
            esmaltes
        })

       })
       .catch(error=>res.send(error))
      
    },

    search: (req, res) => {
        let elemento = req.query.search
        let estado = req.params.estado
        let productossearch = productos.filter((product) => product.estado === estado)
        if(estado === productos[0].estado){
            return res.render('buscar',{
                productossearch,
                estado
            })
        }
        
   

        let resultados = productos.filter(producto => {
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
