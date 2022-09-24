const fs = require('fs')
const path = require('path')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
let users = require('../data/users.json')
const saves = (dato) => fs.writeFileSync(path.join(__dirname, '../data/users.json')
    , JSON.stringify(dato, null, 4), 'utf-8')

module.exports = {
    register: (req,res) => {
        return res.render('users/register')
    },
    check: (req,res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            /* return res.send(req.body) */
            let {name, lastname, email, password} = req.body 
            let newUser = {
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
                saves(users)
                return res.redirect('/usuarios/login')
        }else{
            return res.render('users/register', {
                errors : errors.mapped(),
                old : req.body
            })
        }
        

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
            
            // return res.send(errors) 
            return res.render('users/register', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    login: (req,res) => {
        return res.render('users/login')
    },
    processLogin:(req,res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
        
            const {email} = req.body
            let usuario = users.find(user => user.email === email)
            req.session.userLogin = {
                id : usuario.id,
                name : usuario.name,
                lastname : usuario.lastname,
                email: usuario.email,
                rol : usuario.rol
            }
            return res.redirect('/usuarios/perfil')
        } else {
            // return res.send(errors.mapped())
            return res.render('users/login', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    profil: (req,res) => {
        let session = req.session.userLogin
        let user = users.find(user => user.id === session?.id)
        /* return res.send(user) */
        return res.render('users/perfil',{
            user
        })
    },
    changeProfilPic: (req, res) => {
        let session = req.session.userLogin
        // let id = session.id
        console.log(session?.id)
        let user = users.find(user => user.id === session?.id)
        console.log(user)

        if(user) user.imagen = req.file.filename;
         
        saves(users);
        return res.redirect('/usuarios/perfil');
    },
    logout: (req, res) => {
        req.session.destroy();
        /* if(req.cookies.Wonder){
            res.cookie('Wonder','',{maxAge: -1})
        } */
        return res.redirect('/')
    },
    editProfil: (req, res) => {
        return res.render('users/editProfil')
    }
}