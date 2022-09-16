const fs = require('fs')
const path = require('path')

let users = require('../data/users.json')
const saves = (dato) => fs.writeFileSync(path.join(__dirname, '../data/users.json')
    , JSON.stringify(dato, null, 4), 'utf-8')
const {validationResult} = require('express-validator')

module.exports = {
    register: (req,res) => {
        return res.render('users/register')
    },
    check: (req,res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            return res.send(req.body)

        }else{
            return res.render('users/register', {
                errors : errors.mapped(),
                old : req.body
            })
        }
        let newUser = {
			id: userss[users.length - 1].id + 1,
  			name: req.body.name,
			lastname : req.body.lastname,
			email : req.body.email,
			password : req.body.password,
			password : req.body.password
		}

        users.push(newUser)
        saves(users)
        return res.redirect('users/perfil')
    },
    login: (req,res) => {
        return res.render('users/login')
    },
    perfil: (req,res) => {
        return res.render('users/perfil')
    }
}