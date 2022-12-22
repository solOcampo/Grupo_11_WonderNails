let db = require('../../database/models')
const { Op } = require("sequelize");


const productVerify = (carrito, id) => {
    let index = -1;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === +id) {
            index = i;
            break
        }
    }
    return index
}
module.exports = {
    listCart: async (req, res) => {
        // res.send("Hola!")
        try {
            let response = {
                status: 200,
                meta: {
                    length: req.session.carrito.length,
                    path: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: req.session.carrito
            }
            return res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    addItem: async (req, res) => {
        console.log("ingreso a additem");
        let producto = await db.Productos.findOne({
            where: {
                id: +req.params.id
            },
            include: [
                {
                    association: 'imagenes',
                    attributes: ['nombre']
                }
            ]
        })
        // creamos el objeto/item que se agregara que se pasara a la session
        let item = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            descuento: producto.descuento,
            imagen: producto.imagenes[0].nombre,
            stock: producto.stock,
            cantidad:1,
            Total_compra: producto.precio,
            subtotal: +producto.precio - (+producto.precio * +producto.descuento / 100),
            // Ordenes_id: orden.id ,
        }

        // verificamos que si el carrito esta vacio
        if (req.session.carrito.length === 0) {
            let orden = await db.Ordenes.findOne({
                where: {
                    Usuarios_id: req.session.userLogin.id,
                    status: 'pending'
                },
                include: [
                    {
                        association: 'carritos',
                        attributes: ['Productos_id', 'Total_compra'],
                    }
                ]
            })
            if (!orden) {
                // creamos un nuevo registro asociado al usuario
                let newOrden = await db.Ordenes.create({
                    Usuarios_id: req.session.userLogin.id,
                    status: 'pending'
                })
                //agregamos el dato faltante al Item
                item = {
                    ...item,
                    Ordenes_id: newOrden.id
                }

                // actualizamos los datos de la session
                req.session.carrito.push(item)

                // creamos un nuevo registro de carrito asociado a la orden de compra anteriormente creada
                await db.Carritos.create({
                    Usuarios_id: req.session.userLogin.id,
                    Productos_id: item.id,
                    Ordenes_id: newOrden.id,
                    Total_items:1,
                    Total_compra: item.precio,
                })
                
            } else {
                // en caso de que el usuario tenga una orden de compra asociada y el carrito vacio
                item = {
                    ...item,
                    ordenId: orden.id
                }

                req.session.carrito.push(item)

                await db.Carritos.create({
                    Usuarios_id: req.session.userLogin.id,
                    Productos_id: item.id,
                    Ordenes_id: orden.id,
                    Total_items:1,
                    Total_compra: item.precio,
                })
            }
        } else {
            console.log("Ingreso correctamente")
            // en caso de que el usuario tenga productos en su carrito

            let index = productVerify(req.session.carrito, req.params.id);
            let orden = await db.Ordenes.findOne({
                where: {
                    Usuarios_id: req.session.userLogin.id,
                    status: 'pending'
                }
            })

            console.log(index)
            if (index === -1) {
                item = {
                    ...item,
                    ordenId: orden.id
                }

                req.session.carrito.push(item)

                await db.Carritos.create({
                    Ordenes_id: orden.id,
                    Productos_id: item.id,
                    Usuarios_id: req.session.userLogin.id,
                    Total_items: 1,
                    Total_compra:item.precio
                })
                console.log("Aca muestro el carrito")
                console.log(req.session.carrito)
                
            } else {
                // el producto existe en el carrito
                let producto = req.session.carrito[index]
                console.log(req.session.carrito)
                console.log("El producto si existe");

                producto.cantidad= +producto.cantidad+1;
                producto.subtotal = (+producto.precio - (+producto.precio * +producto.descuento / 100)) * +producto.cantidad,
                producto.Total_compra=(+producto.precio * +producto.cantidad)

                req.session.carrito[index] = producto;
                console.log(req.session.carrito)
                await db.Carritos.update(
                    {
                        Total_items: producto.cantidad,
                        Total_compra: producto.Total_compra
                    },
                    {
                        where: {
                            Ordenes_id: producto.ordenId,
                            Productos_id: producto.id
                        }
                    }
                )

            }
        }

        console.log("Aca mostramos la session que se pasa nuevamente")
        console.log(req.session.carrito)
        let response = {
            status: 200,
            meta: {
                length: req.session.carrito.length,
                path: `${req.protocol}://${req.get('host')}${req.originalUrl}`
            },
            data: req.session.carrito
        }
        console.log(response)
        return res.status(200).json(response)

    },
    removeItem: async (req, res) => {

        try {

            // buscamos la posición del producto dentro del carrito(session)
            let index = productVerify(req.session.carrito, +req.params.id );

            let producto = req.session.carrito[index];
            // eliminar el item de la sessión
            req.session.carrito.splice(index, 1)

            // eliminar el item de la base de datos
            await db.Carritos.destroy({
                where: {
                    Productos_id: producto.id,
                    Ordenes_id: producto.ordenId
                }
            })

            let response = {
                status: 200,
                meta: {
                    length: req.session.carrito.length,
                    path: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: req.session.carrito
            }
            return res.status(200).json(response)

        } catch (error) {

        }
    },
    modifyItem: async (req, res) => {

        // buscamos la posición del producto dentro del carrito(session)
        let index = productVerify(req.session.carrito, +req.params.id );

        let producto = req.session.carrito[index];

        if(producto.Total_compra > 1) {
            //tenemos que actualizar la cantidad

            // actulizamos en la sessión
            producto.Total_compra--;
            producto.subtotal = (+producto.precio - (+producto.precio * +producto.descuento / 100)) * producto.Total_compra;

            req.session.carrito[index] = producto;

            // actualizamos en la base de datos
            await db.Carritos.update({
                Total_compra: producto.Total_compra
            }, {
                where : {
                    Productos_id: producto.id,
                    Ordenes_id: producto.ordenId
                }
            })

        } else {
            // tenemos que elimiar el item

            //eliminamos el item de la sessión
            req.session.carrito.splice(index, 1)

            //eliminarlo de la base de datos

            await db.Carritos.destroy({
                where: {
                    Ordenes_id: producto.ordenId,
                    Productos_id: producto.id
                }
            })

        }

        let response = {
            status: 200,
            meta: {
                length: req.session.carrito.length,
                path: `${req.protocol}://${req.get('host')}${req.originalUrl}`
            },
            data: req.session.carrito
        }
        return res.status(200).json(response)

    },
    empty: async (req, res) => {
    }
}