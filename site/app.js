require('dotenv').config()
const createError = require("http-errors");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const testConnection = require('./utils/dbConnectionTest')
testConnection()
/* Implementamos locals dentro de nuestra aplicacion */
const userLogin = require("./middlewares/userLoginCheck");
const adminCheck = require("./middlewares/adminCheck");



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.use(express.static(path.resolve(__dirname, "public")));

/* Login e inicio de sesion */
app.use(
  session({
    secret: "Wonder Nails",
    resave: true,
    saveUninitialized: false
  })
);

app.use(userLogin);

/* cookies */
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

let indexRouter = require("./routes/index");
let adminRouter = require("./routes/admin");
let productosRouter = require("./routes/productos");
let usuariosRouter = require("./routes/usuarios");
// api
let apiRouter = require('./routes/api/api')

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/usuarios", usuariosRouter);
app.use("/productos", productosRouter);
app.use("/admin", adminCheck, adminRouter);
// api
app.use('/api',apiRouter);

/* app.use(function(req, res, next) {
  res.status(404).render('partials/error');
}); */

/* app.use(function(req, res, next) {
    next(createError(404));
  }); */

app.listen(port, () =>
  console.log(
    `El servidor fue levantado con exito en el puerto http://localhost:${port}`
  )
);
