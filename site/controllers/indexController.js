let productos = require('../data/productos.json')


module.exports = {
    home: (req,res) => {
        let productosNuevos = [];
        let productosFavs = [];
        let productosOferta = [];
        let esmaltes = [];
        productos.forEach(producto => {
            if (producto.estado === "Nuevo") {
            return productosNuevos.push(producto);
            }else if(producto.estado === "Favoritos"){
                return productosFavs.push(producto)
            }else if(producto.estado === "Oferta"){
                return productosOferta.push(producto)
            }else if(producto.categoria === "Esmaltes"){
                return esmaltes.push(producto)
            }
        });
        return res.render('home',{
            productos,
            productosNuevos,
            productosFavs,
            productosOferta,
            esmaltes
        })
    }
}