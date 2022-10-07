/* test de conexion a la base de datos */
const {sequelize} = require('../database/models');

const dbConnectionTest = async () => {
    try{
        await sequelize.authenticate()
        console.log('La conexion fue establecida con éxito');
    } catch (error){
        console.log('No pudimos conectarnos con la base de datos', error);
    }
}

module.exports = dbConnectionTest