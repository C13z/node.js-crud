const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('Tas conectao');

    } catch (error) {
        throw new Error('Error a la hora de iniciar la base de datos.')
    }


}


module.exports = {
    dbConnection,
}