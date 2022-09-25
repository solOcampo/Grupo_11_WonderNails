module.exports = (req,res,next) => {
    if (req.session.userLogin) {
        if (req.session.userLogin.rol === 'Administrador') {
            return next()
        }
    }
    res.redirect('/')
}