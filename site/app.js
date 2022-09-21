const createError = require('http-errors');
const express = require('express')
const app = express()
const port=3210
const path=require('path')
const methodOverride = require('method-override')
const session = require('express-session')
const cookieParser = require('cookie-parser')
/* Implementamos locals dentro de nuestra aplicacion */
const userLogin = require('./middlewares/userLoginCheck')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'))

app.use(express.static(path.resolve(__dirname,'public')))



let indexRouter = require('./routes/index')
let adminRouter = require('./routes/admin') 
let productosRouter = require('./routes/productos')
let usuariosRouter = require('./routes/usuarios')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/productos', productosRouter);
app.use('/admin',adminRouter); 


/* Login e inicio de sesion */
app.use(session({
  secret: "Wonder Nails"
}))

app.use(userLogin)

/* cookies */
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'..', 'public')));

app.use(function(req, res, next) {
    next(createError(404));
  });
  

app.listen(port,() => console.log(`El servidor fue levantado con exito en el puerto http://localhost:${port}`))

