// let db = require('../../database/models')

// module.exports = {
//     list: (req,res) => {
//         db.Productos.findAll()
//         .then(list => {
//             let respons={
//                 status :200,
//                 meta:{
//                     total:list.lengh,
//                     link: `${req.protocol}://${req.get('host')}${req.originalUrl}`

//                 },
//                 data: list
//             }
//             return res.status(200).json(respons)
//         }).catch(errors => res.status(500).json('error al acceder a la vista'))

 
//   }
// }