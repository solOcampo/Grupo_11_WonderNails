const fs = require('fs')
let productos = require('./productos.json');

let ultimoId = productos[productos.length - 1].id + 1

console.log(ultimoId);
/* Creamos un nuevo producto */
let nuevoProducto = {
    id: 7,
    nombre:"Esmalte Semipermanente",
    marca: "Meline",
    categoria: "Esmaltado Semipermanente",
    estado:"Nuevo",
    precio: 900,
    descuento: 10,
    descripcion: "Embellecé tus uñas en todo momento y lugar con nuestros esmaltes semipermanentes que son una BOM-BA",
    stock: 30,
    imagen: [
        "default-image.png"
    ]
}

/* productos.push(nuevoProducto);
console.log(productos); */

/* Pasamos el Objeto literal a un string */
/* let string = JSON.stringify(productos,null,4) */
/* Subimos los cambios y actualizaciones al json */
/* fs.writeFileSync('./site/data/productos.json',string,'utf-8') */


/* Editar producto */
let ProduEdit = productos.map((element,index) => {
    if (element.id === 6) {
        element.nombre = "Meline"
        element.categoria = "Esmaltado Semipermanente"
        element.precio = 950
        element.stock = 9
    }
    return element
})

/* console.log(ProduEdit); */

/* Pasamos el Objeto literal a un string */
/* let string = JSON.stringify(ProduEdit,null,4) */
/* Subimos los cambios y actualizaciones al json */
/* fs.writeFileSync('./src/data/productos.json',string,'utf-8') */


/* Eliminar un producto */
let eliminarProducto = productos.filter(element => element.id !== 4)



/* Pasamos el Objeto literal a un string */
/* let string = JSON.stringify(eliminarProducto,null,4) */
/* Subimos los cambios y actualizaciones al json */
/* fs.writeFileSync('./src/data/productos.json',string,'utf-8') */