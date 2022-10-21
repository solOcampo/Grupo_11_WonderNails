const db = require('../database/models/index');
const fs = require('fs')
const path = require('path')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
let products = require('../data/productos.json')
let users = require('../data/users.json')
const saves = (dato) => fs.writeFileSync(path.join(__dirname, '../data/users.json')
    , JSON.stringify(dato, null, 4), 'utf-8')

module.exports = {
    register: (req,res) => {
        return res.render('users/register')
    },
    check: async (req,res) => {
        let errors = validationResult(req)
        
        if(errors.isEmpty()){
            /* return res.send(req.body) */
            let {name, lastname, email, password} = req.body
            
            //------ BASE DE DATOS ----------

            const user = await db.Usuarios.create({
                nombre: name,
                apellido: lastname,
                email: email,
                password: bcrypt.hashSync(password, 10),
                generoId: 2, // generoId y rolId se envian de forma obligatoria
                rolId: 2     // porque la base de datos los requiere para su carga
            })

            console.log(user)
            if(!user) return // Redirigir o no, cuando hubo un error al registrar el usuario

            //-----------------------------------

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
    login: (req,res) => {
        return res.render('users/login')
    },
    processLogin: async (req,res) => {
        let errors = validationResult(req)

        const {email, recordarme} = req.body
        
        if (errors.isEmpty()) {
            
            const user = await db.Usuarios.findOne({
                where: { email: email },
            })
    
            if(user) console.log('USUARIO:',user.dataValues);

            if(!user) return // Si no existe el usuario redigir a donde sea necesario

            let usuario = users.find(user => user.email === email)
            req.session.userLogin = {
                // id : usuario.id,
                // name : usuario.name,
                // lastname : usuario.lastname,
                // email: usuario.email,
                // rol : usuario.rol
                id : user.id,
                name : user.nombre,
                lastname : user.apellido,
                email: user.email,
                rol : 'usuario' // la base de datos trae un id, lo que crea conflicto en otros lados
            }                   // ya que se comprueba por la descripcion y no por el id 
            if(recordarme){
                res.cookie('rememberMe', req.session.userLogin,{
                    maxAge: 1000 * 60 * 60 * 24 * 30
                })
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
            user,
            products
        })
    },
    changeProfilPic: (req, res) => {
        let session = req.session.userLogin
        let id = +session.id

        let errors = validationResult(req)

        if(req.fileValidationError) {
            let imagenPerfil = {
                param : "imagenPerfil",
                msg : req.fileValidationError
            }
            errors.errors.push(imagenPerfil)
        }
        if (errors.isEmpty()){
            users.forEach(user => {
                if (user.id === id) {
                    /* return res.send(user) */
                    let ruta = fs.existsSync(path.join(__dirname, '..', 'public', 'img', 'users', user.imagen))
                    if(ruta && req.file.filename  !== user.imagen&& user.imagen !== "avatar-porDefecto.png"){
                        fs.unlinkSync(path.join(__dirname, '..', 'public', 'img', 'users', user.imagen))
                    }
                    user.imagen = req.file ? req.file.filename : user.imagen
                    /* funciona pero cuando borra la foto anterior, cierra la sesion */
                }
            })
            saves(users);
            return res.redirect('/usuarios/perfil');

        }else{
            return res.send(errors.mapped())
            return res.render('/usuarios/perfil',{
                errors : errors.mapped(),
                old : req.body
            })
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        if(req.cookies.rememberMe){
            res.cookie('rememberMe','',{maxAge: -1})
        } 
        return res.redirect('/')
    },
    editProfil: (req, res) => {
        return res.render('users/editProfil')
    }
}