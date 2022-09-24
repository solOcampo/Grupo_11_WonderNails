let productos = require('../data/productos.json')


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
        const esmaltes = productos.filter(prod => prod.categoria === "Esmaltes")
        const productosNuevos = productos.filter(prod => prod.estado === "Nuevo")
        const productosFavs = productos.filter(prod => prod.estado === "Favoritos")
        const productosOferta = productos.filter(prod => prod.estado === "Oferta")
       

        return res.render('home', {
            productos,
            productosNuevos,
            productosFavs,
            productosOferta,
            esmaltes
        })
    },

    search: (req, res) => {
        let elemento = req.query.search

        let resultados = productos.filter(producto => {
            return producto.marca === elemento.toLowerCase() || (producto.nombre.toLowerCase().includes(elemento.toLowerCase())) /* || (producto.descripcion.toLowerCase().includes(elemento.toLowerCase())) */
        })
        
        //  let resultados = productos.filter(producto => {
        //     return (producto.nombre.toLowerCase().indexOf(elemento.toLowerCase()) != -1)
        // }) 
        //  return res.send(resultados)
        return res.render('buscar',
            {
                buscar: elemento,
                resultados
            });
    }
}
