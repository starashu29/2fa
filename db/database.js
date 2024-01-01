const mongoose = require('mongoose')
const config = require('../config/config');
const database = new Object();

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

database.establishConnection = async() => {
    const dbUrl = config.app.database;
    console.log('MongoDB connection initiated');

    mongoose.set('strictQuery', true);
    await mongoose.connect(dbUrl,options)
        .then(()=>{
            console.log('MongoDB connection successful');
        })
        .catch((err)=>{
            console.log(err.message ? err.message : 'MongoDB connection Error');
            process.exit(0);
        })
};

process.on('SIGINT', function() {
    mongoose.connection.close(function(){
        console.log('Mongoose connection closed successfully');
        process.exit(0);
    });
});

module.exports = database;