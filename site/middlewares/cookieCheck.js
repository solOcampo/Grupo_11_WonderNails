/* const db = require('../database/models/index');

module.exports = (req, res, next) => {
    if (req.cookies.rememberMe = undefined && req.session.userLogin == undefined) {
        let user = db.Usuarios.findOne({
            where :{
                email : req.cookies.rememberMe
            }
        })
        req.session.userLogin = user
    }
    next()
} */