const userSchema = require('../models/user');
const userDal = new Object();

const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');   


userDal.getusername = async (data) => {
    try {
        let user = await userSchema.findOne({ "username": data.username });
        if (!user) {
            return { status: false, message: 'No user Found!' };
        }
        return { status: true, message: "user found" };

    } catch (error) {
        console.log('Error:', error);
        return { status: false, message: error.message ? error.message : error };
    }
}

userDal.userpass = async (data) => {
    try {
        let user = await userSchema.findOne({ "username": data.username });
        if (!user) {
            return { status: false, message: 'No user Found!' };
        }
        if (user.password == data.password) {
            // Generate a secret
            var secret = speakeasy.generateSecret({length: 20});
            console.log(secret);
            user.secret2FA = secret.base32;
            let save = await user.save();
            // Create an OTP URI
            const otpUri = secret.otpauth_url;
            // Set the time step to 60 seconds
     
            const token = speakeasy.totp({
                secret: secret.base32,
                encoding: 'base32',
              
            });
                        let data = { userid: user._id, token: token }
            return { status: true, message: "user passed. 2FA secret sent", data: data };
        }
        return { status: false, message: "wrong password" };
    } catch (error) {
        console.log('Error:', error);
        return { status: false, message: error.message ? error.message : error };
    }
}


userDal.verify = async (data) => {
    try {
        let user = await userSchema.findById(data.userid);
        if (!user) {
            return { status: false, message: 'wrong userid' };
        }
        let base32secret = user.secret2FA;
        let userToken = data.token;
        console.log(userToken);
        console.log(base32secret);
        // Use verify() to check the token against the secret
        var verified = speakeasy.totp.verify({
            secret: base32secret,
            encoding: 'base32',
            token: userToken,
            window: 6
        });
        console.log(verified);
        if (!verified) {
        return { status: false, message: "wrong token, user not verified" };
        }
           // Create a JWT token
           const jwttoken = jwt.sign({ userId: user._id }, 'your-secret-key', {
            expiresIn: 365 * 24 * 60 * 60, // 1 year in seconds, // Token expiration time
         });
        return { status: true, message: "userverified and jwt token sent", data: jwttoken };

    } catch (error) {
        console.log('Error:', error);
        return { status: false, message: error.message ? error.message : error };
    }
}


userDal.createUser = async (data) => {
    try {
        let user = new userSchema(data);


        let result = await user.save();
        if (result) {
            return { status: true, data: result };
        }
        return { status: false, data: result };
    } catch (error) {
        console.log('failed to create new user', error);
        if (error.code == '11000') {
            return {
                status: false,
                message: `${Object.keys(error.keyValue[0])} is already taken`
            };
        }
        else {
            return { status: false, message: error.message ? error.message : error };
        }
    }
};


userDal.viewallusers = async () => {
    try {
        let users = await userSchema.find();
        if (users.length === 0) {
            return { status: false, message: "no users found" };
        }
        return { status: true, message: "users found", data: users };

    } catch (error) {
        console.log('Error:', error);
        return { status: false, message: error.message ? error.message : error };
    }
}












module.exports = userDal;