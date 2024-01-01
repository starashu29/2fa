const express = require('express');
const productRouter = express.Router();
const appController = require('../controllers/productController');
const auth = require('../config/auth');

const isSeller = auth.isSeller;

const isAdminORBuyer = auth.isAdminORBuyer;

//only sellers can create and add new products
productRouter.post('/addaproduct',   isSeller,  async (req, res) => {
    let result = await appController.addaproduct(req);
    res.status(result.code).send(result);
});

//only admin and buyers can view all products
productRouter.get('/getallproducts',   isAdminORBuyer,  async (req, res) => {
    let result = await appController.getAllProduct();
    res.status(result.code).send(result);
});



module.exports = productRouter;
