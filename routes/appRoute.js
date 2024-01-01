const express = require('express')
const userRouter = require('./userRoute');

const appRoute = express.Router();

const productRouter = require('./productRoute');


appRoute.initialize = (app) => {
    app.use('/user', userRouter);

    app.use('/product', productRouter);

};

module.exports = appRoute;