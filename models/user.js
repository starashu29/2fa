const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
    
},

role: {
  type: String,
  required: true
  
},


secret2FA: {
  type: String,
 },


}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;