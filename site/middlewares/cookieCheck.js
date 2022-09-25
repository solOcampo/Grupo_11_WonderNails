module.exports = (req, res, next) => {
    if (req.cookies.rememberMe) {
        req.session.userLogin = req.cookies.rememberMe
    }
    next()
}