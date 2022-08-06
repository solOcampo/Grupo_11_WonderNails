
const express=require('express')
const app=express()
const port=3210
const path=require('path')

app.use(express.json());
app.use(express.static(path.resolve(__dirname,'public')))


let indexRouter = require('./routes/index')
/* let administradorRouter = require('./routes/administrador') */
let productosRouter = require('./routes/productos')
let usuariosRouter = require('./routes/usuarios')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/productos', productosRouter);
/* app.use('/administrador',administradorRouter); */


app.listen(port,() => console.log(`El servidor fue levantado con exito en el puerto http://localhost:${port}`))

