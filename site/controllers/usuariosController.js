const db = require('../database/models/index');
const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
let products = require('../data/productos.json')
let users = require('../data/users.json')
let Sequelize = require('sequelize')
const saves = (dato) => fs.writeFileSync(path.join(__dirname, '../data/users.json')
    , JSON.stringify(dato, null, 4), 'utf-8')

module.exports = {
    register: (req, res) => {
        return res.render('users/register')
    },
    check: async (req, res) => {
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            // return res.send(errors) 
            let { name, lastname, email, password } = req.body

            //------ BASE DE DATOS ----------
            // let usuarios = db.Usuarios.findAll()
            const user = await db.Usuarios.create({
                nombre: name,
                apellido: lastname,
                email: email,
                contraseña: bcrypt.hashSync(password, 10),
                generoId: 2, // generoId y rolId se envian de forma obligatoria
                rolId: 2,  // porque la base de datos los requiere para su carga
                imagen_perfil: "avatar-porDefecto.png",
                imagen_portada: "portada-porDefecto.png"
            })
            /* const adress = await db.Direcciones.create({
                calle: "falsa",
                numero: 1234,
                barrio: null,
                ciudad: " ",
                provincia: " ",
                codigoPostal: 8407,
                usuarioId: usuarios.length,   
            }) */

            console.log(user)
            if (!user) return // Redirigir o no, cuando hubo un error al registrar el usuario

            //-----------------------------------

            /*  let newUser = {
                 id: users[users.length - 1].id + 1,
                     name,
                     lastname,
                     email,
                     password: bcrypt.hashSync(password, 10),
                     rol: "usuario",
                     imagen:"avatar-porDefecto.png"
                     // imagen: req.file?.size > 1 ? req.file.filename :"avatar-porDefecto.png" 
                 
                 }
                 users.push(newUser)
                 saves(users) */
            req.session.carrito = []
            return res.redirect('/usuarios/login')
        } else {
            return res.render('users/register', {
                errors: errors.mapped(),
                old: req.body
            })
        }


    },
    login: (req, res) => {

        return res.render('users/login')
    },
    processLogin: async (req, res) => {
        // return res.send(req.body) 

        let errors = validationResult(req)


        if (errors.isEmpty()) {

            const { email, recordarme } = req.body
            const user = await db.Usuarios.findOne({
                where: { email: email },
            })

            if (user) console.log('USUARIO:', user.dataValues);

            if (!user) return // Si no existe el usuario redigir a donde sea necesario


            req.session.userLogin = {
                id: user.id,
                name: user.nombre,
                lastname: user.apellido,
                email: user.email,
                image_profil: user.imagen_perfil,
                image_frontPage: user.imagen_portada,
                rol: user.rolId // la base de datos trae un id, lo que crea conflicto en otros lados
            }                   // ya que se comprueba por la descripcion y no por el id 
            if (recordarme) {
                res.cookie('rememberMe', req.session.userLogin, {
                    maxAge: 1000 * 60 * 60 * 24 * 30
                })
            }
                req.session.carrito = []
                    db.Ordenes.findOne({
                        where: {
                            Usuarios_id: req.session.userLogin.id,
                            status: 'pending'
                        },
                            include: [
                                {
                                    association : 'carrito',
                                    attributes: ['Productos_id', 'Total_compra'],
                                    include: [
                                        {
                                            association : 'producto',
                                            attributes: ['id', 'nombre', 'precio', 'descuento', 'stock'],
                                            include: [
                                                {
                                                    association : 'imagenes',
                                                    attributes: ['nombre']
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        
                    })
                    .then(orden => {
                        if(!orden) {
                            console.log("El usuario logueado no tiene una orden pendiente")
                            return res.redirect('/usuarios/perfil')
                        } else {
                            console.log("El usuario logueado tiene una orden pendiente")
                            orden.carrito.forEach(item => {
                                let producto = {
                                    id: item.producto.id,
                                    nombre: item.producto.nombre,
                                    precio: item.producto.precio,
                                    descuento: item.producto.descuento,
                                    imagen: item.producto.imagenes[0].nombre,
                                    stock: item.producto.stock,
                                    cantidad:item.Total_items,
                                    Total_compra: +item.Total_compra,
                                    subtotal: ( +item.producto.precio - ( +item.producto.precio * +item.producto.descuento / 100 )) * item.Total_compra,
                                    ordenId: orden.id ,
                                }
                                req.session.carrito.push(producto)
                                
                            })
                            console.log(req.session.carrito)
                            return res.redirect('/usuarios/perfil')
                        }
                    }) .catch(errores => res.send(errores))


        } else {
            // return res.send(errors.mapped())
            return res.render('users/login', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    profil: (req, res) => {
        let session = req.session.userLogin
        /* let user = users.find(user => user.id === session?.id) */
        /* return res.send(user) */
        let user = db.Usuarios.findOne({
            where: { email: session.email }
        })
        return res.render('users/perfil', {
            user,
            session
        })
    },
    changeProfilPic: (req, res) => {
        let session = req.session.userLogin
        let idSession = session.id
        if (req.fileValidationError) {
            let imagen = {
                param: 'imagenPerfil',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }

        db.Usuarios.findOne({
            where: {
                id: idSession
            }
        })
            .then(usuario => {
                usuario = usuario.dataValues

                console.log(usuario);

                let promesas = []
                let imagenPerfil
                let imagenPortada

                if (usuario.imagen_perfil) {
                    if (!!req.files.imagenPerfil) {

                        imagenPerfil = usuario.imagen_perfil

                        promesas.push(
                            db.Usuarios.update({
                                imagen_perfil: req.files.imagenPerfil[0].filename
                            }, {
                                where: {
                                    id: usuario.id
                                }
                            }))

                        if (fs.existsSync(path.join(__dirname, '../public/img/users', imagenPerfil))) {
                            fs.unlinkSync(path.join(__dirname, '../public/img/users', imagenPerfil))
                        }

                    }
                }
                if (usuario.imagen_portada) {
                    if (!!req.files.imagenPortada) {
                        imagenPortada = usuario.imagen_portada

                        promesas.push(
                            db.Usuarios.update({
                                imagen_portada: req.files.imagenPortada[0].filename
                            }, {
                                where: {
                                    id: usuario.id
                                }
                            }))
                        if (fs.existsSync(path.join(__dirname, '../public/img/users', imagenPortada))) {
                            fs.unlinkSync(path.join(__dirname, '../public/img/users', imagenPortada))
                        }
                    }

                }
                Promise.all(promesas)
                    .then(promesas => {
                        db.Usuarios.findOne({
                            where: {
                                id: usuario.id
                            }
                        })

                            .then(user => {
                                req.session.userLogin = {
                                    id: user.id,
                                    name: user.nombre,
                                    lastname: user.apellido,
                                    email: user.email,
                                    image_profil: user.imagen_perfil,
                                    image_frontPage: user.imagen_portada,
                                    rol: user.rolId
                                }
                                if (req.cookies.rememberMe) {
                                    res.cookie('rememberMe', '', { maxAge: -1 });
                                    res.cookie('rememberMe', req.session.userLogin, { maxAge: 1000 * 60 * 60 * 24 })
                                }
                                req.session.save((err) => {
                                    req.session.reload((err) => {
                                        return res.redirect('/usuarios/perfil')
                                    });
                                });
                            })
                    })
            }).catch(err => res.send(err))


    },
    logout: (req, res) => {
        req.session.destroy();
        if (req.cookies.rememberMe) {
            res.cookie('rememberMe', '', { maxAge: -1 })
        }
        return res.redirect('/')
    },
    editProfil: (req, res) => {
        return res.render('users/editProfil')
    }
}