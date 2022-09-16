let productos = require('../data/productos.json')

module.exports = {
    detail: (req,res) => {
        let id = +req.params.id
        let producto = productos.find((producto) => producto.id === id)
        let imagenes = producto.imagen
        let category = productos.filter((product) => product.categoria === producto.categoria)

        return res.render('detalle',{
            producto,
            imagenes,
            category
        })
    },
    cart: (req,res) => {
        return res.render('carrito')
    },
    nailPolish: (req,res) => {
        let esmaltes = []
        productos.forEach(producto =>{
            if(producto.categoria === "Esmaltes")
            return esmaltes.push(producto)
        });
        return res.render('esmaltes',{
            esmaltes
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