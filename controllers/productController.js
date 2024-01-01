let productController = new Object();
const productDal = require('../dal/productDal');
const appHelper = require('../helpers/appHelper');
const mongoose = require('mongoose');



productController.getAllProduct = async () => {
    try {
        let products = await productDal.getAllProducts();
        if (!products.status) {
            return appHelper.apiResponse(201, true, 'No products found', products.data);
        }
        return appHelper.apiResponse(200, true, 'Retrieved all active products', products.data);
    } catch (error) {
        console.log('Failed', error);
        return appHelper.apiResponse(500, false, error.message ? error.message : error);
    }
};



productController.addaproduct = async (req) => {
    try {
        
        let payload = req.body;
        let added = await productDal.addnewproduct(payload);
        if (!added.status) {
            return appHelper.apiResponse(400, false, 'product not added');
        }      
           return appHelper.apiResponse(200, true, 'product created', payload)
    } catch (error) {
        console.log('Failed', error);
        return appHelper.apiResponse(500, false, error.message ? error.message : error);
    }
};


module.exports = productController;