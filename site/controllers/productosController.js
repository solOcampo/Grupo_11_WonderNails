let productos = require('../data/productos.json')

module.exports = {
    detalle: (req,res) => {
        return res.render('detalle')
    },
    carrito: (req,res) => {
        return res.render('carrito')
    },
    esmaltes: (req,res) => {
        return res.render('esmaltes')
    },
    listado: (req, res) => {
            let productosNuevos = [];
            let productosFavs = [];
            let productosOferta = [];
            productos.forEach(producto => {
                if (producto.estado === "Nuevo") {
                return productosNuevos.push(producto);
                }else if(producto.estado === "Favoritos"){
                    return productosFavs.push(producto)
                }else if(producto.estado === "Oferta"){
                    return productosOferta.push(producto)
                }
            });
            return res.render('productos',{
                productos,
                productosNuevos,
                productosFavs,
                productosOferta
            })
        
    }
}