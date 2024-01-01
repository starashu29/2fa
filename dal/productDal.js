const productSchema = require('../models/product');
const productDal = new Object();




productDal.addnewproduct = async (data) => {
    try {
        let product = new productSchema(data);
        let result = await product.save();
        if (result) {
            return { status: true, data: result };
        }
        return { status: false, data: result };
    } catch (error) {
        console.log('failed to create new product', error);
   }
};



productDal.getAllProducts = async () => {
    try {
        let allProducts = await productSchema.find();
        if (allProducts.length === 0) {
            return { status: false, data: allProducts };
        }
        return { status: true, data: allProducts };
    } catch (error) {
        console.log('failed to retrieve product', error);
        return { status: false, message: error.message ? error.message : error };

    }
}






module.exports = productDal;