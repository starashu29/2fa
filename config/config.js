let config = new Object();
require('dotenv').config(); // Load environment variables from .env file

config = {
    app: {
        port: 8080,
        database: process.env.database,
        backendUrl: 'http://localhost:8080/',
        session:{
            cookieKey: 'myfirstnodejsproject'
        }
    }
    }

module.exports = config;
