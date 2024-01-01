const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
 
  price: {
    type: String,
    required: true,
  },
 

 });

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
