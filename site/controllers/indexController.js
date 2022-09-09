let productos = require('../data/productos.json')


module.exports = {
    home: (req, res) => {
        let productosNuevos = [];
        let productosFavs = [];
        let productosOferta = [];
        productos.forEach(producto => {
            if (producto.estado === "Nuevo") {
                return productosNuevos.push(producto);
            } else if (producto.estado === "Favoritos") {
                return productosFavs.push(producto)
            } else if (producto.estado === "Oferta") {
                return productosOferta.push(producto)
            }
        });
        return res.render('home', {
            productos,
            productosNuevos,
            productosFavs,
            productosOferta
        })
    },

    search: (req, res) => {
        let elemento = req.query.search

        let resultados = productos.filter(producto => {
            return producto.marca.toLowerCase() === elemento.toLowerCase() || (producto.titulo.toLowerCase().includes(elemento.toLowerCase())) /* || (producto.descripcion.toLowerCase().includes(elemento.toLowerCase())) */
        })
        /* Codigo de nico */
        /* let resultados = productos.filter(producto => {
            return (producto.titulo.toLowerCase().indexOf(elemento.toLowerCase()) != -1)
        }) */

        return res.render('busqueda',
            {
                busqueda: elemento,
                resultados
            });
    }
}
