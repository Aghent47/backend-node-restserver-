const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Base de datos online')

    } catch (error) {
        console.log(error)
        throw new Error('ERROR A LA HORA DE CONECTAR LA BASE DE DATOS');
    }

}

module.exports = {
    dbConnection
}