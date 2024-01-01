const express = require('express');

const config = require('./config/config');
const dbConnection = require('./db/database');
const appRoute = require('./routes/appRoute'); // Import appRoute once
const cors = require('cors');

const session = require('express-session');
const bodyParser = require('body-parser');


var path = require('path');

const app = express();




//body parser middleware
// parse application/x-www-form-urlencoded

app.use(bodyParser.json());



const initializeServer = async () => {
  await dbConnection.establishConnection();


  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(cors());
  
  // Initialize appRoute once
  appRoute.initialize(app);

  app.listen(config.app.port, () =>
    console.log('Backend is running on port: ', config.app.port)
  );
};

initializeServer();
