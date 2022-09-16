const fs = require('fs')
const path = require('path')
// const bcrypt = require('bcryptjs')
let usuarios = require('../data/users.json')
const { validationResult } = require('express-validator')

const save = (dato) => fs.writeFileSync(path.join(__dirname, '../data/users.json')
    , JSON.stringify(dato, null, 4), 'utf-8')

module.exports = {
    register: (req,res) => {
        return res.render('register')
    },
    processRegister:(req,res) => {
        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'image',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {
            let {nombre, apellido,email,contraseña,} = req.body
            let usuarioNuevo = {
                id:usuarios[usuarios.length - 1].id + 1,
                nombre,
                apellido,
                email,
                contraseña: bcrypt.hashSync(contraseña, 12),
                image: req.file.size > 1 ? req.file.filename : "avatar-porDefecto.png",
                rol: "usuario"
            }
            usuarios.push(usuarioNuevo)
            save(usuarios)

            return res.redirect('/')
        } else {

            // let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'images', 'users', dato))
            // if (ruta(req.file.filename) && (req.file.filename !== "default-image.png")) {
            //     fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'images', 'users', req.file.filename))
            // }
            
            return res.send(errors) 
            // return res.render('users/register', {
            //     errors: errors.mapped(),
            //     old: req.body
            // })
        }
    },
    login: (req,res) => {
        return res.render('login')
    },
    processLogin:(req,res) => {
      
        let errors = validationResult(req)
        if (errors.isEmpty()) {
        
            const {email} = req.body
            let usuario = usuarios.find(user => user.email === email)

            req.session.userLogin = {
                id : usuario.id,
                nombre : usuario.nombre,
                imagen : usuario.imagen,
                rol : usuario.rol
            }
           
        } else {
            // return res.send(errors.mapped())
            return res.render('login', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    perfil: (req,res) => {
        return res.render('perfil')
    }
}