module.exports = (req, res, next) => {
    
    if (req.session.userLogin) {
      return next();
    }

  res.render("inicieSesion");
};
