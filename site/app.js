
const express=require('express')
const app=express()
const port=3210
const path=require('path')


app.use(express.static(path.resolve(__dirname,'public')))


app.get('/',(req,res)=> res.sendFile(path.join(__dirname,'views','home.html')))
app.get('/detalle',(req,res)=> res.sendFile(path.join(__dirname,'views','detalle.html')))
app.get('/carrito',(req,res)=> res.sendFile(path.join(__dirname,'views','carrito.html')))
app.get('/login',(req,res)=> res.sendFile(path.join(__dirname,'views','login.html')))
app.get('/register',(req,res)=> res.sendFile(path.join(__dirname,'views','register.html')))


app.listen(port,() => console.log(`El servidor fue levantado con exito en el puerto ${port}`))

